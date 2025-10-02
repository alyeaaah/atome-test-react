import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { Modal, Spin } from "antd"; // AntD components
import { UNSAFE_DO_NOT_USE_isLoadingAtom } from "@/utils/store";

export default function Main() {
  const isMutating = useIsMutating({
    predicate(mutation) {
      return !!mutation.options.meta?.showLoader;
    },
  });

  const isQuerying = useIsFetching({
    fetchStatus: "fetching",
    predicate(query) {
      return !!query.options.meta?.showLoader;
    },
  });

  const isLoading = useAtomValue(UNSAFE_DO_NOT_USE_isLoadingAtom);

  const open = isLoading || isQuerying || isMutating;

  return (
    <Modal
      open={!!open}
      footer={null}
      closable={false}
      centered
      maskClosable={false}
      keyboard={false}
    >
      <div className="flex flex-col items-center justify-center p-6">
        <Spin size="large" />
        <div className="mt-4 text-gray-600 text-lg font-medium">
          Loading...
        </div>
      </div>
    </Modal>
  );
}
