"use client";

import React, { useState } from "react";
import { GetTagListResponseDto } from "@/api/generated";
import { Button, Input, ColorPicker, Tag, Tooltip } from "antd";
import { RiEdit2Fill, RiDeleteBin6Fill } from "react-icons/ri";
import { FaSave, FaTimes } from "react-icons/fa";
import { UpdateTagRequestDto } from "@/api/generated";
import { useForm } from "react-hook-form";
import { Form } from "antd";
import CustomColorPicker from "@/app/components/ColorPickers/CustomColorPicker";
import { FormInput } from "@/app/components/Input/FormInput";
import { CustomButton } from "@/app/components/Buttons/CustomButton";

type TagRowProps = {
  tag: GetTagListResponseDto;
  onUpdate: (id: string, data: UpdateTagRequestDto) => Promise<void>;
  onDelete: (tag: GetTagListResponseDto) => void;
};

type EditTagForm = {
  name: string;
  color: string;
};

export function TagRow({ tag, onUpdate, onDelete }: TagRowProps) {
  const [isEditing, setIsEditing] = useState(false);

  const { control, handleSubmit, reset } = useForm<EditTagForm>({
    defaultValues: {
      name: tag.name,
      color: tag.color,
    },
  });

  const handleSave = async (data: EditTagForm) => {
    try {
      await onUpdate(tag.id, data);
      setIsEditing(false);
    } catch (error) {}
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  if (isEditing) {
    // --- Edit Mode ---
    return (
      <Form layout="inline" onFinish={handleSubmit(handleSave)}>
        <div className="flex w-full items-center gap-2 p-3 border rounded-lg bg-white shadow-sm">
          <div>
            <CustomColorPicker<EditTagForm> name="color" control={control} />
          </div>

          <div className="w-full">
            <FormInput<EditTagForm> name="name" control={control} />
          </div>

          <span className="text-sm text-gray-400 whitespace-nowrap">
            ({tag._count?.tasks || 0} tasks)
          </span>
          <div className="ml-auto flex gap-2">
            <Tooltip title="Cancel">
              <CustomButton
                icon={<FaTimes />}
                onClick={handleCancel}
                variant="outline"
              />
            </Tooltip>
            <Tooltip title="Save">
              <CustomButton
                icon={<FaSave />}
                variant="primary"
                htmlType="submit"
              />
            </Tooltip>
          </div>
        </div>
      </Form>
    );
  }

  // --- View Mode ---
  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg bg-white shadow-sm">
      <Tag color={tag.color} style={{ fontSize: "14px", padding: "4px 8px" }}>
        {tag.name}
      </Tag>
      <span className="text-lg font-medium">{tag.name}</span>
      <span className="text-sm text-gray-400 ml-4">
        ({tag._count?.tasks || 0} tasks)
      </span>
      <div className="ml-auto flex gap-2">
        <Tooltip title="Edit">
          <CustomButton
            icon={<RiEdit2Fill />}
            onClick={() => setIsEditing(true)}
            variant="secondary"
          />
        </Tooltip>
        <Tooltip title="Delete">
          <CustomButton
            danger
            icon={<RiDeleteBin6Fill />}
            onClick={() => onDelete(tag)}
            variant="outline"
          />
        </Tooltip>
      </div>
    </div>
  );
}
