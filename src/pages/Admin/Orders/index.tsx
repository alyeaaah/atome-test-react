import { Button, Input, Spin } from "antd";
import { CheckCircleOutlined, DeleteOutlined, FileExclamationOutlined, FileProtectOutlined, FileSearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { OrderApiHooks } from "./api";
import { PetApiHooks } from "../Pet/api";
import moment from "moment";
import { OrderData } from "./api/schema";
import Confirmation from "@/components/Modal/Confirmation";
import { queryClient } from "@/utils/react-query";
import { useToast } from "@/components/Toast/ToastContext";

export const OrderPage = () => {
  const [search, setSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalDelete, setModalDelete] = useState<OrderData | undefined>(undefined);
  const { showNotification } = useToast();
  const {data: orders} = OrderApiHooks.useGetOrderById({
      params: {
        orderId: search
      }
    },
    {
      enabled: !!search && isSubmitting,
      onSettled() {
        setIsSubmitting(false);
      },
      onSuccess(data) {
        setIsSubmitting(false);
      }
    });
  const { mutateAsync: actionDeleteOrder } = OrderApiHooks.useDeleteOrder({
    params: {
      orderId: modalDelete?.id?.toString() || ""
    }
  });
  const {data: dataPet} = PetApiHooks.useGetPetById({
    params: {
      petId: typeof orders === "object" ? orders.petId.toString() : ""
    }
  }, {
    enabled: !!orders && typeof orders === "object"
  });

  const handleDelete = (record: OrderData | undefined) => {
    if (!record) return;
    actionDeleteOrder(undefined).then(() => {
      queryClient.invalidateQueries({
        queryKey: OrderApiHooks.getKeyByAlias("getOrderById")
      });
      showNotification({
        duration: 3000,
        text: `Order ${record.id} deleted successfully`,
        icon: <CheckCircleOutlined />,
        variant: "success",
      });
      setSearch("");
      setModalDelete(undefined);
    });
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 2xl:col-span-12">
        <div className="grid grid-cols-12 my-8">
          {/* BEGIN: General Report */}
          <div className="col-span-12 mb-2">
            <div className="flex items-center justify-center h-10 intro-y">
              <h2 className="mr-5 text-4xl font-bold truncate text-neutral-900">
                  Pet Orders
              </h2>
            </div>
          </div>
          <div className="col-span-12 mt-4">
            <div className="flex flex-col items-center justify-center space-y-4 h-fit">
              <Input placeholder="Enter Order ID" type="number" className="text-center w-1/2" value={search} onChange={(e) => setSearch(e.target.value)} />
              <Button
                type="primary"
                size="large"
                className="w-fit !min-h-10 font-bold disabled:bg-gray-400 disabled:text-gray-900"
                disabled={!search || isSubmitting}
                onClick={() => setIsSubmitting(true)}
              >
                <FileSearchOutlined />
                Search
              </Button>
              <span className="text-center text-gray-400 text-xs">Enter Order ID to get information about the order</span>
            </div>
          </div>
          <div className="col-span-12 mt-4">
            {search && isSubmitting && (
              <div className="flex items-center justify-center h-10 intro-y">
                <Spin />
                <span className="ml-2">Looking for your order...</span>
              </div>
            )}
            {}
            {search && !isSubmitting && typeof orders !== "object" && (
              <div className="flex items-center justify-center h-10 intro-y">
                <FileExclamationOutlined className="text-2xl"/>
                <span className="ml-2">Order not found</span>
              </div>
            )}
            
            {search && !isSubmitting && typeof orders === "object" && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex items-center justify-center">
                  <FileProtectOutlined className="text-2xl"/>
                  <span className="ml-2 text-lg font-bold">Order found!</span>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 min-w-[50%] bg-gray-50 flex flex-col relative overflow-hidden">
                  <div className="flex items-center justify-center absolute top-0 left-0 border-b border-r rounded-br-lg px-2 py-1 bg-gray-400">
                    <span className="text-xs text-white leading-5">Order Information</span>
                  </div>
                  <div
                    className="flex items-center justify-center absolute bottom-0 right-0 border-t border-r rounded-tl-lg px-2 py-1 bg-danger hover:bg-red-800 cursor-pointer"
                    onClick={() => setModalDelete(orders)}
                  >
                    <span className="text-xs text-white leading-5"><DeleteOutlined /> Delete</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    <span className="col-span-2 font-bold text-end">Order ID: </span>
                    <span className="col-span-4 text-gray-600">{orders.id}</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    <span className="col-span-2 font-bold text-end">Pet ID: </span>
                    <span className="col-span-4 text-gray-600">{orders.petId}</span>
                  </div>
                  {!!dataPet?.name && <div className="grid grid-cols-6 gap-2">
                    <span className="col-span-2 font-bold text-end">Pet Name: </span>
                    <span className="col-span-4 text-gray-600">{dataPet?.name}</span>
                  </div>}
                  <div className="grid grid-cols-6 gap-2">
                    <span className="col-span-2 font-bold text-end">Quantity: </span>
                    <span className="col-span-4 text-gray-600">{orders.quantity}</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    <span className="col-span-2 font-bold text-end">Ship Date: </span>
                    <span className="col-span-4 text-gray-600">{moment(orders.shipDate).format("DD MMMM YYYY HH:mm")}</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    <span className="col-span-2 font-bold text-end">Status: </span>
                    <span className={`col-span-4 text-gray-600 ${orders.complete ? "text-green-600" : "text-red-600"}`}>{orders.complete ? "Completed" : "On Progress"}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Confirmation
        open={!!modalDelete}
        onClose={() => setModalDelete(undefined)}
        title="Delete Order"
        description="Are you sure you want to delete this order?"
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