import React from "react";
import CustomModal from "@/app/components/Modals/CustomModal";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useTranslations } from "next-intl";

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
  const t = useTranslations();

  return (
    <CustomModal
      title={t("Tasks.deleteModal.title")}
      open={open}
      onClose={onClose}
      onOk={onConfirm}
      okText={t("Tasks.deleteModal.confirm")}
      cancelText={t("Tasks.deleteModal.cancel")}
      okButtonProps={{ danger: true }}
      confirmLoading={loading}
    >
      <div className="flex items-center gap-4 py-4">
        <ExclamationCircleFilled className="text-red-500 text-3xl" />
        <p>
          {t.rich("Tasks.deleteModal.message", {
            title: title || "",
            b: (chunks) => <b>{chunks}</b>,
          })}
          <br />
          <span className="text-sm text-gray-500">
            {t("Tasks.deleteModal.warning")}
          </span>
        </p>
      </div>
    </CustomModal>
  );
}
