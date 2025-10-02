import { Divider } from "antd";
import { PetData } from "./api/schema";
import UploadDropzone from "@/components/UploadDropzone";
import { UploadChangeParam } from "antd/es/upload";
import { RcFile } from "antd/es/upload";
import { useToast } from "@/components/Toast/ToastContext";
import { PetApiHooks } from "./api";
import { useState } from "react";
import { queryClient } from "@/utils/react-query";

export const PetDetail = ({ pet }: { pet: PetData | undefined }) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const { showNotification } = useToast();
  const {data} = PetApiHooks.useGetPetById({
    params: {
      petId: pet?.id?.toString() || ""
    }
  });
  const { mutate: actionUploadImage } = PetApiHooks.useUploadImage({
    params: {
      petId: pet?.id?.toString() || ""
    }
  });
  const petData = data || pet;
  const uploadHandler = async (info: UploadChangeParam, index: number) => {
    setUploading(true);
    await actionUploadImage(info.file as RcFile as File, {
      onError: (error) => {
        setUploading(false);
        showNotification({
          duration: 3000,
          text: `Failed to upload image ${error?.message}`,
          icon: "XCircle",
          variant: "danger",
        });
      },
      onSuccess: (res) => {
        queryClient.invalidateQueries({
          queryKey: PetApiHooks.getKeyByAlias("getPetById")
        });
      }
    });
    setUploading(false);
  }
    return (
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Pet Information</h1>
          <Divider className="my-4" />
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <div className="grid grid-cols-12 col-span-12 gap-6">
              <div className="col-span-3 flex flex-row items-center gap-2 justify-end">
                <label htmlFor="photo">Photo</label>
              </div>
              <div className="col-span-6 flex flex-row items-center gap-2">
                      <UploadDropzone
                        uploadType="image"
                        className="w-full h-full"
                        name={`media_url`}
                        index={0}
                        onChange={uploadHandler}
                        fileList={petData?.photoUrls ? petData.photoUrls : []}
                        loading={uploading}
                      />
              </div>
            </div>
          </div>
          {petData && (
            <div className="col-span-12 grid grid-cols-12 gap-x-6 gap-y-2">
              <div className="col-span-3 flex flex-row items-center gap-2 justify-end">
                <label htmlFor="name" className="text-sm">Name:</label>
              </div>
              <div className="col-span-9 text-sm font-semibold">
                <p>{petData.name}</p>
              </div>


              <div className="col-span-3 flex flex-row items-center gap-2 justify-end">
                <label htmlFor="name" className="text-sm">Category:</label>
              </div>
              <div className="col-span-9 text-sm font-semibold">
                <p>{petData.category?.name}</p>
              </div>


              <div className="col-span-3 flex flex-row items-center gap-2 justify-end">
                <label htmlFor="name" className="text-sm">Tags:</label>
              </div>
              <div className="col-span-9 text-sm font-semibold">
                <p>{petData.tags?.map((tag) => tag.name).join(", ")}</p>
              </div>

              <div className="col-span-3 flex flex-row items-center gap-2 justify-end">
                <label htmlFor="name" className="text-sm">Status:</label>
              </div>
              <div className="col-span-9 text-sm font-semibold">
                <p>{petData.status}</p>
              </div>
            </div>
            
          )}
        </div>
        </div>
    );
}