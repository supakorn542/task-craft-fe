import React from "react";
import CustomModal from "@/app/components/Modals/CustomModal";
import { ExclamationCircleFilled } from "@ant-design/icons";

type TaskDeleteModalProps = {
  title: string | undefined;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
};

export default function TaskDeleteModal({
  title,
  open,
  onClose,
  onConfirm,
  loading,
}: TaskDeleteModalProps) {
  return (
    <CustomModal
      title="Delete Task?"
      open={open}
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
          Are you sure you want to delete task <b>{title}</b>?
          <br />
          <span className="text-sm text-gray-500">
            This action cannot be undone.
          </span>
        </p>
      </div>
    </CustomModal>
  );
}
