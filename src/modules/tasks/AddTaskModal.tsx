"use client";

import React, { useState } from "react";
import CustomModal from "../../app/components/Modals/CustomModal";
import { Form } from "antd";
import { FormInput } from "@/app/components/Input/FormInput";
import { TextAreaInput } from "@/app/components/Input/TextAreaInput";
import { ApiError, CreateTaskRequestDto } from "@/api/generated";
import { useForm } from "react-hook-form";
import { SelectInput } from "@/app/components/Selects/SelectInput";
import { GetTaskResponseDto } from "@/api/generated";
import { CustomButton } from "@/app/components/Buttons/CustomButton";
import { CustomDatePicker } from "@/app/components/DatePickers/CustomDatePicker";
import { useNotify } from "@/app/contexts/NotificationContext";
import { apiClient } from "@/api";

type AddTaskModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AddTaskModal({ open, onClose }: AddTaskModalProps) {

  const notification = useNotify();


  const statusOptions = Object.values(GetTaskResponseDto.status).map(
    (status) => ({
      label: status.replace("_", " "),
      value: status,
    })
  );
  const priorityOptions = Object.values(GetTaskResponseDto.priority).map(
    (priority) => ({
      label: priority.replace("_", " "),
      value: priority,
    })
  );

  const { control, handleSubmit, reset } = useForm<CreateTaskRequestDto>({
    defaultValues: {
      status: statusOptions[0].value,
      priority: priorityOptions[0].value,
    },
  });

  const handleFormSubmit = async (data: CreateTaskRequestDto) => {
    
    try{
      await apiClient.task.taskControllerCreateTask(data)
      if(data){
        notification.showSuccess("Form submit success")
        reset()
        onClose()

      }

    }catch(e){
      if(e instanceof ApiError){
        notification?.showError("Form submit failed ", e.body?.message)
      }
    }
  };
  return (
    <>
      <CustomModal
        open={open}
        title="Add New Task"
        onClose={onClose}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit(handleFormSubmit)}
          className="flex flex-col"
        >
          <div>
            <FormInput<CreateTaskRequestDto>
              name="title"
              control={control}
              label="Title"
              placeholder="Enter Title"
              type="text"
              rules={{ required: "Title is required" }}
            />
          </div>

          <div>
            <TextAreaInput<CreateTaskRequestDto>
              name="description"
              control={control}
              label="Description"
              placeholder="Enter Description"
              rows={2}
              autoSize={false}
              style={{ resize: "none" }}
            />
          </div>

          <div className="flex gap-4 w-full justify-between">
            <div className="w-full">
              <SelectInput<CreateTaskRequestDto>
                name="status"
                control={control}
                label="Status"
                options={statusOptions}
              />
            </div>

            <div className="w-full">
              <SelectInput<CreateTaskRequestDto>
                name="priority"
                control={control}
                label="Priority"
                options={priorityOptions}
              />
            </div>
          </div>
          <div className="w-full">
            <CustomDatePicker<CreateTaskRequestDto>
              name="dueDate"
              control={control}
              label="Due Date"
            />
          </div>
          <div className="flex justify-end">
            <CustomButton htmlType="submit" variant="primary">
              Submit
            </CustomButton>
          </div>
        </Form>
      </CustomModal>
    </>
  );
}
