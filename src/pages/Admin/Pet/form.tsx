import { paths } from "@/router/paths";
import { useRouteParams } from "typesafe-routes/react-router";
import { PetApiHooks } from "./api";
import { Controller, FormProvider } from "react-hook-form";
import { useForm, SubmitHandler } from "react-hook-form";
import { PetFormData } from "./api/schema";
import { PetStatusEnum } from "./api/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { petFormSchema } from "./api/schema";
import { Button, Input, Select } from "antd";
import { useAtomValue } from "jotai";
import { categoriesAtom, tagsAtom } from "@/utils/store";
import { useState } from "react";
import { useToast } from "@/components/Toast/ToastContext";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { queryClient } from "@/utils/react-query";


export const PetForm = () => {
  const navigate = useNavigate();
  const { id } = useRouteParams(paths.administrator.pet.update);
  const categories = useAtomValue(categoriesAtom);
  const tags = useAtomValue(tagsAtom);
  const [searchTags, setSearchTags] = useState<string>("");
  const { showNotification } = useToast();

  const methods = useForm<PetFormData>({
    defaultValues: {
      name: "",
      photoUrls: [],

      status: PetStatusEnum.available,
      tags: [],
    },
    resolver: zodResolver(petFormSchema),
  });

  const { data } = PetApiHooks.useGetPetById({
    params: {
      petId: id
    }
  }, {
    enabled: !!id,
    onSuccess: (data) => {
      methods.reset({
        name: data.name,
        photoUrls: data.photoUrls,
        status: data.status,
        tags: data.tags,
        category: data.category,
      }, {
        keepIsValidating: true,
      });
    }
  });
  const { mutate: actionUpdatePet } = PetApiHooks.useUpdatePet();
  const { mutate: actionCreatePet } = PetApiHooks.useCreatePet();
  // const { mutate: actionUploadImage } = PetApiHooks.useUploadImage({
  //   params: {
  //     petId: id
  //   }
  // });
  const { handleSubmit, formState : { isSubmitting, isValid, errors }, setValue, } = methods;
  const onSubmit:SubmitHandler<PetFormData> = (data: PetFormData) => {
    if (id) {
      data.id = Number(id);
      actionUpdatePet(data, {
        onError: (error) => {
          showNotification({
            duration: 3000,
            text: `Failed to update pet ${error?.message}`,
            icon: <ExclamationCircleOutlined />,
            variant: "danger",
          });
        },
        onSuccess: (res) => {
          showNotification({
            duration: 3000,
            text: "Pet updated successfully",
            icon: <CheckCircleOutlined />,
            variant: "success",
          });
          queryClient.invalidateQueries({
            queryKey: PetApiHooks.getKeyByAlias("getPetListByStatus")
          });
          queryClient.invalidateQueries({
            queryKey: PetApiHooks.getKeyByAlias("getPetById")
          });
          navigate(paths.administrator.pet.list);
        }
      });
    } else {
      data.id = Math.floor(1e11 + Math.random() * 9e11);
      actionCreatePet(data, {
        onError: (error) => {
          showNotification({
            duration: 3000,
            text: `Failed to create pet ${error?.message}`,
            icon: <ExclamationCircleOutlined />,
            variant: "danger",
          });
        },
        onSuccess: (res) => {
          queryClient.invalidateQueries({
            queryKey: PetApiHooks.getKeyByAlias("getPetListByStatus")
          });
          queryClient.invalidateQueries({
            queryKey: PetApiHooks.getKeyByAlias("getPetById")
          });
          showNotification({
            duration: 3000,
            text: "Pet created successfully",
            icon: <CheckCircleOutlined />,
            variant: "success",
          });
          navigate(paths.administrator.pet.list);
        }
      });
    }
  };
  
    return (
      <div className="grid grid-cols-12 gap-6 my-8">

        <div className="col-span-12">
          <div className="flex items-center h-10 intro-y">
            <h2 className="mr-5 text-lg font-bold truncate">
                {id ? "Edit" : "Add New "} Pet
            </h2>
          </div>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="col-span-12 grid grid-cols-12 gap-6">
            <div className="grid grid-cols-12 col-span-12 gap-6">
              <div className="col-span-3 flex flex-row items-center gap-2 justify-end">
                <label htmlFor="name">Name</label>
              </div>
              <div className="col-span-6 flex flex-row items-center gap-2">
                <Controller
                  name="name"
                  control={methods.control}
                  render={({ field }) => (
                    <div className="flex flex-col w-full gap-2">
                      <Input
                        {...field}
                        name="name"
                        placeholder="Enter pet name"
                        className="w-full"
                        id="name"
                      />
                      {errors.name && (
                        <span className="text-danger">
                          {errors.name.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-12 col-span-12 gap-6">
              <div className="col-span-3 flex flex-row items-center gap-2 justify-end">
                <label htmlFor="name">Category</label>
              </div>
              <div className="col-span-6 flex flex-row items-center gap-2">
                <Controller
                  name="category"
                  control={methods.control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select category"
                      className="w-full h-10"
                      value={field.value?.id}
                      onChange={(value) => {
                        field.onChange(categories?.find((category) => category.id === value));
                      }}
                      options={categories?.map((category) => ({
                        value: category.id,
                        label: category.name,
                        key: category.id,
                      }))}
                      id="name"
                    />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-12 col-span-12 gap-6">
              <div className="col-span-3 flex flex-row items-center gap-2 justify-end">
                <label htmlFor="tags">Tags</label>
              </div>
              <div className="col-span-6 flex flex-row items-center gap-2">
                <Controller
                  name="tags"

                  control={methods.control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select tags"
                      className="w-full min-h-10"
                      mode="multiple"
                      allowClear
                      onChange={(value) => {
                          field.onChange(tags?.filter((tag) => value.includes(tag.id)));
                      }}
                      value={field.value?.map((tag) => tag.id)}
                      filterOption={(input, option) =>
                        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                      }
                      options={tags?.filter((tag) => tag.name.toLowerCase().includes(searchTags.toLowerCase())).map((tag) => ({
                        value: tag.id,
                        label: tag.name,
                        key: tag.id,
                      }))}
                      id="tags"
                    />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-12 col-span-12 gap-6">
              <div className="col-span-3 flex flex-row items-center gap-2 justify-end">
                <label htmlFor="status">Status</label>
              </div>
              <div className="col-span-6 flex flex-row items-center gap-2">
                <Controller
                  name="status"
                  control={methods.control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select status"
                      className="w-full h-10 capitalize"
                      value={field.value}
                      options={Object.values(PetStatusEnum).map((status) => ({
                        value: status,
                        label: <span className="capitalize" key={status}>{status}</span>,
                        key: status,
                      }))}
                      id="status"
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-9 flex flex-row items-center gap-2 justify-end">
              <Button
                type="default"
                htmlType="button"
                onClick={() => navigate(paths.administrator.pet.list)}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" disabled={!isValid || isSubmitting}>Submit</Button>
            </div>  
          </form>
        </FormProvider>  

      </div>
    );
}