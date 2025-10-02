import { useState } from "react";

import { PetApiHooks } from "./api";
import {
  CheckCircleOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { Button, Modal, Space, Table, Tabs } from "antd";
import { CategoryTagData, PetData, PetStatusEnum } from "./api/schema";
import { ColumnType } from "antd/es/table";
import TabPane from "antd/es/tabs/TabPane";
import { paths } from "@/router/paths";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { categoriesAtom, tagsAtom } from "@/utils/store";
import { PetDetail } from "./detail";
import Confirmation from "@/components/Modal/Confirmation";
import { useToast } from "@/components/Toast/ToastContext";
import { queryClient } from "@/utils/react-query";

export const PetPage = () =>{
  const navigate = useNavigate();
  const { showNotification } = useToast();
  const [status, setStatus] = useState<PetStatusEnum>(PetStatusEnum.available);
  const setCategories = useSetAtom(categoriesAtom);
  const setTags = useSetAtom(tagsAtom);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
  });
  const [modalDetail, setModalDetail] = useState<PetData | undefined>(undefined);
  const [modalDelete, setModalDelete] = useState<PetData | undefined>(undefined);

  const { data, isLoading } = PetApiHooks.useGetPetListByStatus({
    queries: {
    status: status
    }
  }, {
    onSuccess(data) {
      const categories: CategoryTagData[] = Array.from(
        new Map(data.filter(pet => !!pet.category).map(pet => [pet.category!.id, pet.category])).values()
      ).filter((category) => category !== null && category !== undefined);
      const tags: CategoryTagData[] = Array.from(
        new Map(data.flatMap(pet => (pet.tags || []).map(tag => [tag.id, tag]))).values()
      ).filter((tag) => tag !== null && tag !== undefined);
      setCategories(categories);
      setTags(tags);
    },
    onError(error) {
      console.log(error);
    }
  });

  const { mutateAsync: actionDeletePet } = PetApiHooks.useDeletePet({
    params: {
      petId: modalDelete?.id?.toString() || ""
    }
  });

  const handleEdit = (record: PetData) => {
    navigate(paths.administrator.pet.update({id: record.id.toString()}).$);
  };
  const handleDelete = (record: PetData | undefined) => {
    if (!record) return;
    actionDeletePet(undefined).then(() => {
      setModalDelete(undefined);
      showNotification({
        duration: 3000,
        text: `Pet ${record.name} deleted successfully`,
        icon: <CheckCircleOutlined />,
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: PetApiHooks.getKeyByAlias("getPetListByStatus")
      });
    });
  };

  const columns: ColumnType<PetData>[] = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1 + (pagination.current - 1) * pagination.pageSize,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: { id: number; name: string }[]) => tags.map((tag) => tag.name).join(", "),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button className="border-danger text-danger" onClick={(e) => {
            e.stopPropagation();
            setModalDelete(record);
          }}>Delete</Button>
        </Space>
      ),
    },
  ];
  const tabs = [
    {
      key: PetStatusEnum.available,
      label: "Available",
    },
    {
      key: PetStatusEnum.pending,
      label: "Pending",
    },
    {
      key: PetStatusEnum.sold,
      label: "Sold",
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 2xl:col-span-12">
        <div className="grid grid-cols-12 my-8">
          {/* BEGIN: General Report */}
          <div className="col-span-12">
            <div className="flex items-center h-10 intro-y">
              <h2 className="mr-5 text-lg font-bold truncate">
                Pet List
              </h2>
              <Link to={paths.administrator.pet.create} className="flex items-center ml-auto text-primary">
                <PlusOutlined className="mr-2" /> Add New Pet
              </Link>
            </div>
          </div>
          <div className="col-span-12">
            <Tabs
              onChange={(value) => setStatus(value as PetStatusEnum)}
            >
              {tabs.map((tab) => (
                <TabPane tab={tab.label} key={tab.key}>
                  <Table
                    columns={columns}
                    dataSource={data || []}
                    loading={isLoading}
                    rowKey="id"
                    rowClassName="cursor-pointer"
                    onRow={(record) => ({
                      onClick: () => {
                        setModalDetail(record);
                      },
                    })}
                    pagination={{
                      pageSize: pagination.pageSize,
                      current: pagination.current,
                      total: data?.length || 0,
                      showSizeChanger: true,
                      showQuickJumper: true,
                      showTotal: (total) => `Total ${total} items`,
                      onChange: (page, pageSize) => {
                        setPagination({
                          current: page,
                          pageSize,
                        });
                      },
                    }}
                  />
                </TabPane>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
      <Modal
        open={!!modalDetail}
        onCancel={() => setModalDetail(undefined)}
        width={"50%"}
        footer={null}
        key={JSON.stringify(modalDetail)}
      >
        <PetDetail pet={modalDetail} />
      </Modal>
      <Confirmation
        open={!!modalDelete}
        onClose={() => setModalDelete(undefined)}
        onConfirm={() => handleDelete(modalDelete)}
        title="Delete Pet"
        description="Are you sure you want to delete this pet?"
        buttons={[
          {
            label: "Delete",
            onClick: () => handleDelete(modalDelete),
          },
          {
            label: "Cancel",
            variant: "primary",
            onClick: () => setModalDelete(undefined),
          },
        ]}
      />
    </div>
  );
}
