import { apiClient } from "@/api";
import {
  ApiError,
  CreateTaskRequestDto,
  GetTagListResponseDto,
  GetTaskDetailResponseDto,
  GetTaskResponseDto,
  UpdateTaskRequestDto,
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

type TaskModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  taskToEdit?: GetTaskDetailResponseDto | null;
};

type TaskFormData = CreateTaskRequestDto | UpdateTaskRequestDto;

export default function TaskModal({
  open,
  onClose,
  onSuccess,
  taskToEdit,
}: TaskModalProps) {
  const notification = useNotify();
  const isEditMode = !!taskToEdit;

  const [tagList, setTagList] = useState<GetTagListResponseDto[]>([]);

  const statusOptions = Object.values(GetTaskResponseDto.status).map(
    (status) => ({
      label: status.replace("_", " "),
      value: status,
    })
  );

  const { control, handleSubmit, reset } = useForm<TaskFormData>({
    defaultValues: {
      title: "",
      description: "",
      status: statusOptions[0].value,
      dueDate: undefined,
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
        status: statusOptions[0].value,
        dueDate: undefined,
        tags: [],
      });
    }
  }, [taskToEdit, open, reset]);

  const handleFormSubmit = async (data: TaskFormData) => {
    try {
      if (isEditMode && taskToEdit) {
        await apiClient.task.taskControllerUpdateTask(
          taskToEdit.id,
          data as UpdateTaskRequestDto
        );
        notification.showSuccess("Task updated successfully");
      } else {
        await apiClient.task.taskControllerCreateTask(
          data as CreateTaskRequestDto
        );
        notification.showSuccess("Task created successfully");
      }
      onSuccess();
      onClose();
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError("Form submit feiled", e.body?.message);
      }
    }
  };

  return (
    <CustomModal
      open={open}
      title={isEditMode ? "Edit Task" : "Add New Task"}
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
            label="Title"
            rules={{ required: "Title is required" }}
          />
        </div>
        <div>
          <TextAreaInput<TaskFormData>
            name="description"
            control={control}
            label="Description"
            rows={4}
            style={{ resize: "none" }}
          />
        </div>
        <div>
          <SelectInput<TaskFormData>
            name="tags"
            control={control}
            label="Tags"
            mode="tags"
            options={tagList.map((tag) => ({ label: tag.name, value: tag.id }))}
            placeholder="Select or create tags"
            tokenSeparators={[","]}
          />
        </div>
        <div>
          <SelectInput<TaskFormData>
            name="status"
            control={control}
            label="Status"
            options={statusOptions}
          />
        </div>

        <div>
          <CustomDatePicker<TaskFormData>
            name="dueDate"
            control={control}
            label="Due Date"
            style={{ width: "100%" }}
          />
        </div>
        <div className="flex justify-end">
          <CustomButton htmlType="submit" variant="primary">
            {isEditMode ? "Update Task" : "Create Task"}
          </CustomButton>
        </div>
      </Form>
    </CustomModal>
  );
}
