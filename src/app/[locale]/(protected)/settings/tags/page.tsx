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
import { TagRow } from "../../../../../modules/tags/TagRow";
import PageHeader from "@/app/components/PageHeader";
import { CustomButton } from "@/app/components/Buttons/CustomButton";
import { Form } from "antd";
import CustomColorPicker from "@/app/components/ColorPickers/CustomColorPicker";
import { useForm } from "react-hook-form";
import { FormInput } from "@/app/components/Input/FormInput";
import TagDeleteModal from "@/modules/tags/TagDeleteModal";
import { useTags } from "@/app/contexts/TagContext";
import ListSkeleton from "@/app/components/Skeletons/ListSkeleton";
import { getErrorMessage } from "@/utils/error";
import { useTranslations } from "next-intl";

type CreateTagForm = {
  name: string;
  color: string;
};

export default function ManageTagsPage() {
  const t = useTranslations();
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
        notification.showError(
          t("Tags.notifications.fetchError"),
          e.body?.message
        );
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

      notification.showSuccess(
        t("Tags.notifications.createSuccess", { name: res.name })
      );
      reset();
      setIsCreating(false);
      getTagData();
      refreshTags();
    } catch (e) {
      notification.showError(
        t("Tags.notifications.createError"),
        getErrorMessage(e)
      );
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
        t("Tags.notifications.deleteSuccess", { name: deletingTag.name })
      );
      setDeletingTag(null);
      getTagData();
      refreshTags();
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError(
          t("Tags.notifications.deleteError"),
          e.body?.message
        );
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // --- Logic การอัปเดต ---
  const handleUpdateTag = async (id: string, data: UpdateTagRequestDto) => {
    try {
      await apiClient.tag.tagControllerUpdateTag(id, data);
      notification.showSuccess(t("Tags.notifications.updateSuccess"));
      getTagData();
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError(t("Tags.notifications.updateError"), e.body?.message);
        throw e;
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4 px-2 md:px-0 md:pr-4 min-h-screen">
      <PageHeader text={t("Tags.title")} />

      <div className="flex flex-col gap-6">
        <div className="">
          {!isCreating ? (
            <CustomButton variant="primary" onClick={() => setIsCreating(true)}>
              {t("Tags.createButton")}
            </CustomButton>
          ) : (
            <Form onFinish={handleSubmit(handleCreateTagFormSubmit)}>
              <div className="flex flex-col md:flex-row items-center md:gap-3 p-4 border rounded-lg bg-gray-50 w-full shadow-sm">
                <div className="flex flex-1 gap-3 items-center w-full">
                  <div className="shrink-0">
                    <CustomColorPicker<CreateTagForm>
                      name="color"
                      control={control}
                    />
                  </div>

                  <div className="w-full">
                    <FormInput<CreateTagForm>
                      name="name"
                      control={control}
                      placeholder={t("Tags.form.placeholder")}
                      rules={{ required: t("Tags.form.required") }}
                      formItemProps={{ style: { marginBottom: 0 } }}
                    />
                  </div>
                </div>

                <div className="flex self-end justify-end gap-2 md:w-auto mt-2 md:mt-0">
                  <CustomButton
                    onClick={() => setIsCreating(false)}
                    variant="secondary"
                  >
                    {t("Tags.form.cancel")}
                  </CustomButton>

                  <CustomButton htmlType="submit" variant="primary">
                    {t("Tags.form.save")}
                  </CustomButton>
                </div>
              </div>
            </Form>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {isLoading ? (
            <ListSkeleton count={5} />
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
