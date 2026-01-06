import CustomModal from "@/app/components/Modals/CustomModal";
import React from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { GetTagListResponseDto } from "@/api/generated";
import { useTranslations } from "next-intl";

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
  const t = useTranslations();

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
          {t.rich("Tags.deleteModal.message", {
            name: data?.name || "",
            count: data?._count?.tasks || 0,
            b: (chunks) => <b>{chunks}</b>,
          })}
        </p>
      </div>
    </CustomModal>
  );
}
