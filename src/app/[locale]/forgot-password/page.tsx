"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "antd";
import { FormInput } from "@/app/components/Input/FormInput";
import { CustomButton } from "@/app/components/Buttons/CustomButton";
import { useNotify } from "@/app/contexts/NotificationContext";
import { apiClient } from "@/api";
import Link from "next/link";
import { useTranslations } from "next-intl";

type ForgotFormValues = {
  email: string;
};

export default function ForgotPasswordPage() {
  const t = useTranslations();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ForgotFormValues>({
    defaultValues: { email: "" },
  });

  const notification = useNotify();

  const handleForgot = async (data: ForgotFormValues) => {
    try {
      await apiClient.auth.authControllerForgotPassword(data);

      notification.showSuccess(t("ForgotPassword.notifications.success"));
    } catch (e) {
      notification.showError(t("ForgotPassword.notifications.error"));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-2">{t("ForgotPassword.title")}</h1>
        <p className="text-gray-500 text-center mb-6">{t("ForgotPassword.subtitle")}</p>

        <Form
          layout="vertical"
          onFinish={handleSubmit(handleForgot)}
          className="flex flex-col gap-4"
        >
          <FormInput<ForgotFormValues>
            name="email"
            control={control}
            label={t("ForgotPassword.emailLabel")}
            placeholder={t("ForgotPassword.emailPlaceholder")}
            type="email"
            rules={{
              required: t("ForgotPassword.validation.emailRequired"),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t("ForgotPassword.validation.emailInvalid"),
              },
            }}
          />

          <CustomButton
            htmlType="submit"
            variant="primary"
            className="w-full"
            loading={isSubmitting}
          >
            {t("ForgotPassword.submitButton")}
          </CustomButton>
        </Form>

        <div className="mt-4 text-center">
          <Link href="/login" className="text-text-secondary hover:underline">
            {t("ForgotPassword.backToLogin")}
          </Link>
        </div>
      </div>
    </div>
  );
}
