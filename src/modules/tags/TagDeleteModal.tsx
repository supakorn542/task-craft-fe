import CustomModal from "@/app/components/Modals/CustomModal";
import React from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { GetTagListResponseDto } from "@/api/generated";

type TagDeleteModalProps = {
  data: GetTagListResponseDto | null;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
};

export default function TagDeleteModal({
  data,
  onClose,
  onConfirm,
  loading,
}: TagDeleteModalProps) {
  return (
    <CustomModal
      title="Delete Tag?"
      open={!!data}
      onClose={onClose}
      onOk={onConfirm}
      okText="Delete"
      cancelText="Cancel"
      okButtonProps={{ danger: true }}
      confirmLoading={loading}
    >
      <div className="flex items-center gap-4 py-4">
        <ExclamationCircleFilled className="text-red-500 text-3xl" />
        <p>
          Are you sure you want to delete <b>{data?.name}</b>? This tag is used
          in <b>{data?._count?.tasks || 0}</b> tasks and will be removed from
          all of them.
        </p>
      </div>
    </CustomModal>
  );
}
