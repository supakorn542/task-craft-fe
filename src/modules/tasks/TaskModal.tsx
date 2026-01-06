import { apiClient } from "@/api";
import {
  ApiError,
  CreateTaskRequestDto,
  GetTagListResponseDto,
  GetTaskDetailResponseDto,
  GetTaskResponseDto,
  UpdateTaskRequestDto,
  TaskResponseDto,
} from "@/api/generated";
import { CustomButton } from "@/app/components/Buttons/CustomButton";
import { CustomDatePicker } from "@/app/components/DatePickers/CustomDatePicker";
import { FormInput } from "@/app/components/Input/FormInput";
import { TextAreaInput } from "@/app/components/Input/TextAreaInput";
import CustomModal from "@/app/components/Modals/CustomModal";
import { SelectInput } from "@/app/components/Selects/SelectInput";
import { useNotify } from "@/app/contexts/NotificationContext";
import { Form } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TaskStatus } from "@/types/task";
import { useTags } from "@/app/contexts/TagContext";
import { useTranslations } from "next-intl";

type TaskModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  taskToEdit?: GetTaskDetailResponseDto | null;
  initialStatus?: TaskStatus;
  initialDate?: string;
};

type TaskFormData = CreateTaskRequestDto | UpdateTaskRequestDto;

export default function TaskModal({
  open,
  onClose,
  onSuccess,
  taskToEdit,
  initialStatus,
  initialDate,
}: TaskModalProps) {
  const t = useTranslations();
  const notification = useNotify();
  const isEditMode = !!taskToEdit;

  const { refreshTags } = useTags();

  const [tagList, setTagList] = useState<GetTagListResponseDto[]>([]);

  const statusOptions = Object.values(TaskStatus).map((status) => ({
    label: t(`Tasks.status.${status}`),
    value: status,
  }));

  const { control, handleSubmit, reset } = useForm<TaskFormData>({
    defaultValues: {
      title: "",
      description: "",
      status: initialStatus || statusOptions[0].value,
      dueDate: initialDate || undefined,
    },
  });

  const getTagList = async () => {
    try {
      const res = await apiClient.tag.tagControllerGetTags();
      setTagList(res);
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError("Get tag list failed", e.body?.message);
      }
    }
  };

  useEffect(() => {
    if (open) {
      getTagList();
    }
  }, [open]);

  useEffect(() => {
    if (isEditMode && taskToEdit) {
      const tagIds = taskToEdit.tags?.map((tag) => tag.id) || [];

      const formValues = {
        ...taskToEdit,
        dueDate: taskToEdit.dueDate || undefined,
        tags: tagIds,
      };
      reset(formValues);
    } else {
      reset({
        title: "",
        description: "",
        status: initialStatus || statusOptions[0].value,
        dueDate: initialDate || undefined,
        tags: [],
      });
    }
  }, [taskToEdit, open, reset, initialStatus, initialDate]);

  const handleFormSubmit = async (data: TaskFormData) => {
    try {
      if (isEditMode && taskToEdit) {
        await apiClient.task.taskControllerUpdateTask(
          taskToEdit.id,
          data as UpdateTaskRequestDto
        );
        notification.showSuccess(t("Tasks.modal.messages.updateSuccess"));
      } else {
        await apiClient.task.taskControllerCreateTask(
          data as CreateTaskRequestDto
        );
        notification.showSuccess(t("Tasks.modal.messages.createSuccess"));
      }

      await refreshTags();
      onSuccess();
      onClose();
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError("Form submit failed", e.body?.message);
      }
    }
  };

  return (
    <CustomModal
      open={open}
      title={
        isEditMode ? t("Tasks.modal.editTitle") : t("Tasks.modal.addTitle")
      }
      onClose={onClose}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={handleSubmit(handleFormSubmit)}
        className="flex flex-col"
      >
        <div>
          <FormInput<TaskFormData>
            control={control}
            name="title"
            label={t("Tasks.modal.labels.title")}
            rules={{ required: t("Tasks.modal.validation.titleRequired") }}
          />
        </div>
        <div>
          <TextAreaInput<TaskFormData>
            name="description"
            control={control}
            label={t("Tasks.modal.labels.description")}
            rows={4}
            style={{ resize: "none" }}
          />
        </div>
        <div>
          <SelectInput<TaskFormData>
            name="tags"
            control={control}
            label={t("Tasks.modal.labels.tags")}
            placeholder={t("Tasks.modal.placeholders.tags")}
            mode="tags"
            options={tagList.map((tag) => ({ label: tag.name, value: tag.id }))}
            tokenSeparators={[","]}
          />
        </div>
        <div>
          <SelectInput<TaskFormData>
            name="status"
            control={control}
            label={t(`Tasks.modal.labels.status`)}
            options={statusOptions}
          />
        </div>

        <div>
          <CustomDatePicker<TaskFormData>
            name="dueDate"
            control={control}
            label={t("Tasks.modal.labels.dueDate")}
            style={{ width: "100%" }}
          />
        </div>
        <div className="flex justify-end">
          <CustomButton htmlType="submit" variant="primary">
            {isEditMode
              ? t("Tasks.modal.buttons.update")
              : t("Tasks.modal.buttons.create")}
          </CustomButton>
        </div>
      </Form>
    </CustomModal>
  );
}
