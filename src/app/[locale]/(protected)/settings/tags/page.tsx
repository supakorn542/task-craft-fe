"use client";

import React, { useState, useEffect } from "react";
import { apiClient } from "@/api";
import {
  ApiError,
  CreateTagRequestDto,
  GetTagListResponseDto,
  UpdateTagRequestDto,
} from "@/api/generated";
import { useNotify } from "@/app/contexts/NotificationContext";
import { Button, Modal, Input, ColorPicker, Spin } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { TagRow } from "../../../../../modules/tags/TagRow"; // ตรวจสอบ Path นี้ให้ถูกต้อง
import PageHeader from "@/app/components/PageHeader";
import { CustomButton } from "@/app/components/Buttons/CustomButton";
import { Form } from "antd";
import CustomColorPicker from "@/app/components/ColorPickers/CustomColorPicker";
import { useForm } from "react-hook-form";
import { FormInput } from "@/app/components/Input/FormInput";
import TagDeleteModal from "@/modules/tags/TagDeleteModal";
import { useTags } from "@/app/contexts/TagContext";

type CreateTagForm = {
  name: string;
  color: string;
};

export default function ManageTagsPage() {
  const notification = useNotify();

  const { refreshTags } = useTags();

  const [tags, setTags] = useState<GetTagListResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { control, handleSubmit, reset } = useForm<CreateTagForm>({
    defaultValues: {
      name: "",
      color: "#000000",
    },
  });

  const [isCreating, setIsCreating] = useState(false);

  const [deletingTag, setDeletingTag] = useState<GetTagListResponseDto | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const getTagData = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.tag.tagControllerGetTags();
      setTags(res);
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError("Failed to fetch tags", e.body?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTagData();
  }, []);

  // --- Logic การสร้าง Tag ---
  const handleCreateTagFormSubmit = async (data: CreateTagForm) => {
    const tagDto: CreateTagRequestDto = {
      name: data.name,
      color: data.color,
    };

    try {
      const res = await apiClient.tag.tagControllerCreateTag(tagDto);

      notification.showSuccess(`Tag ${res.name} created successfully`);
      reset();
      setIsCreating(false);
      getTagData();
      refreshTags();
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError("Failed to create tag", e.body?.message);
      }
    }
  };

  // --- Logic การลบ Tag ---
  const showDeleteConfirm = (tag: GetTagListResponseDto) => {
    setDeletingTag(tag);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingTag) return;
    setIsDeleting(true);
    try {
      await apiClient.tag.tagControllerDeleteTag(deletingTag.id);
      notification.showSuccess(
        `Tag "${deletingTag.name}" deleted successfully`
      );
      setDeletingTag(null);
      getTagData();
      refreshTags();
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError("Failed to delete tag", e.body?.message);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // --- Logic การอัปเดต ---
  const handleUpdateTag = async (id: string, data: UpdateTagRequestDto) => {
    try {
      await apiClient.tag.tagControllerUpdateTag(id, data);
      notification.showSuccess("Tag updated successfully");
      getTagData();
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError("Failed to update tag", e.body?.message);
        throw e;
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4 pr-4 min-h-screen">
      <PageHeader text={"Manage Tags"} />
      <div className="flex flex-col gap-6">
        <div className="">
          {!isCreating ? (
            <CustomButton variant="primary" onClick={() => setIsCreating(true)}>
              + Create New Tag
            </CustomButton>
          ) : (
            <Form
              layout="inline"
              onFinish={handleSubmit(handleCreateTagFormSubmit)}
            >
              <div className="flex gap-2 p-4 border rounded-lg bg-gray-50 w-full">
                <div>
                  <CustomColorPicker<CreateTagForm>
                    name="color"
                    control={control}
                  />
                </div>

                <div className="w-full">
                  <FormInput<CreateTagForm>
                    name="name"
                    control={control}
                    placeholder="New tag name"
                    rules={{ required: "Name is required" }}
                  />
                </div>
                <div>
                  <CustomButton
                    onClick={() => setIsCreating(false)}
                    variant="secondary"
                  >
                    Cancel
                  </CustomButton>
                </div>
                <div>
                  <CustomButton htmlType="submit" variant="primary">
                    Save
                  </CustomButton>
                </div>
              </div>
            </Form>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {isLoading ? (
            <div className="text-center p-10">
              <Spin size="large" />
            </div>
          ) : (
            tags.map((tag) => (
              <TagRow
                key={tag.id}
                tag={tag}
                onUpdate={handleUpdateTag}
                onDelete={showDeleteConfirm}
              />
            ))
          )}
        </div>
      </div>

      <TagDeleteModal
        data={deletingTag}
        onClose={() => setDeletingTag(null)}
        onConfirm={handleDeleteConfirm}
        loading={isDeleting}
      />
    </div>
  );
}
