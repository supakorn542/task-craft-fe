"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "antd";
import { FormInput } from "@/app/components/Input/FormInput";
import { CustomButton } from "@/app/components/Buttons/CustomButton";
import { useNotify } from "@/app/contexts/NotificationContext";
import { apiClient } from "@/api";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiError } from "@/api/generated";
import { useTranslations } from "next-intl";

type ResetFormValues = {
  newPassword: string;
  confirmPassword: string;
};

export default function ResetPasswordPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const notification = useNotify();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<ResetFormValues>({
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (!token) {
      notification.showError(
        t("ResetPassword.notifications.invalidLinkTitle"),
        t("ResetPassword.notifications.missingToken")
      );
      router.push("/login");
    }
  }, [token, router, notification, t]);

  const handleReset = async (data: ResetFormValues) => {
    if (!token) return;

    try {
      await apiClient.auth.authControllerResetPassword({
        token: token,
        newPassword: data.newPassword,
      });

      notification.showSuccess(t("ResetPassword.notifications.success"));
      router.push("/login");
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError(
          t("ResetPassword.notifications.failedTitle"),
          e.body?.message || t("ResetPassword.notifications.failedMessage")
        );
      }
    }
  };

  if (!token) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          {t("ResetPassword.title")}
        </h1>

        <Form
          layout="vertical"
          onFinish={handleSubmit(handleReset)}
          className="flex flex-col gap-4"
        >
          <FormInput<ResetFormValues>
            name="newPassword"
            control={control}
            label={t("ResetPassword.form.newPasswordLabel")}
            type="password"
            rules={{
              required: t("ResetPassword.validation.passwordRequired"),
              minLength: {
                value: 6,
                message: t("ResetPassword.validation.passwordMin"),
              },
            }}
          />

          <FormInput<ResetFormValues>
            name="confirmPassword"
            control={control}
            label={t("ResetPassword.form.confirmPasswordLabel")}
            type="password"
            rules={{
              required: t("ResetPassword.validation.confirmRequired"),
              validate: (val: string) => {
                if (watch("newPassword") != val) {
                  return t("ResetPassword.validation.mismatch");
                }
              },
            }}
          />

          <CustomButton
            htmlType="submit"
            variant="primary"
            className="w-full mt-2"
            loading={isSubmitting}
          >
            {t("ResetPassword.form.submitButton")}
          </CustomButton>
        </Form>
      </div>
    </div>
  );
}
