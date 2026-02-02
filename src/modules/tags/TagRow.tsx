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
import { useTranslations } from "next-intl";

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
  const t = useTranslations();
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
    return (
      <Form onFinish={handleSubmit(handleSave)}>
        <div className="flex flex-col md:flex-row w-full items-start md:items-center md:gap-3 p-3 border rounded-lg bg-white shadow-sm ring-2 ring-brand/20">
          <div className="flex flex-1 gap-3 w-full">
            <div className="shrink-0">
              <CustomColorPicker<EditTagForm> name="color" control={control} />
            </div>
            <div className="w-full">
              <FormInput<EditTagForm>
                name="name"
                control={control}
                formItemProps={{ style: { marginBottom: 0 } }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between w-full md:w-auto mt-2 md:mt-0 gap-4">
            <span className=" text-gray-400 whitespace-nowrap">
              {t("Tags.row.tasks", { count: tag._count?.tasks || 0 })}
            </span>

            <div className="flex gap-2">
              <Tooltip title={t("Tags.row.cancel")}>
                <CustomButton
                  icon={<FaTimes />}
                  onClick={handleCancel}
                  variant="outline"
                />
              </Tooltip>
              <Tooltip title={t("Tags.row.save")}>
                <CustomButton
                  icon={<FaSave />}
                  variant="primary"
                  htmlType="submit"
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </Form>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3 p-3 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
        <Tag color={tag.color} className="shrink-0 mr-0 hidden md:inline-block">
          {tag.name}
        </Tag>

        <div className="flex items-baseline gap-2 overflow-hidden">
          <span className="text-base md:text-lg font-medium truncate">
            {tag.name}
          </span>

          <span className="text-xs md:text-sm text-gray-400 shrink-0">
            <span className="md:hidden">({tag._count?.tasks || 0})</span>
            <span className="hidden md:inline">
              ({t("Tags.row.tasks", { count: tag._count?.tasks || 0 })})
            </span>
          </span>
        </div>
      </div>

      <div className="flex gap-1 md:gap-2 shrink-0 ml-2">
        <CustomButton
          icon={<RiEdit2Fill />}
          onClick={() => setIsEditing(true)}
          variant="secondary"
          className="p-2!"
        />
        <CustomButton
          danger
          icon={<RiDeleteBin6Fill />}
          onClick={() => onDelete(tag)}
          variant="outline"
          className="p-2!"
        />
      </div>
    </div>
  );
}
