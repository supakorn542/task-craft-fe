"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "antd";
import { FormInput } from "@/app/components/Input/FormInput";
import { ApiError } from "@/api/generated";
import { useRouter } from "next/navigation";
import { useNotify } from "@/app/contexts/NotificationContext";
import { apiClient } from "@/api";
import { CustomButton } from "@/app/components/Buttons/CustomButton";
import { useTranslations } from "next-intl";

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const t = useTranslations();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const router = useRouter();
  const notification = useNotify();

  const handleRegister = async (data: RegisterFormValues) => {
    try {
      const { confirmPassword, ...payload } = data;
      await apiClient.user.userControllerCreate(payload);

      notification.showSuccess(t("Register.notifications.success"));
      router.push("/login");
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError(
          t("Register.notifications.error"),
          e.body?.message
        );
      }
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(handleRegister)}
      className="flex flex-col gap-1"
    >
      <FormInput<RegisterFormValues>
        name="email"
        control={control}
        label={t("Register.form.emailLabel")}
        placeholder={t("Register.form.emailPlaceholder")}
        type="email"
        rules={{
          required: t("Register.validation.emailRequired"),
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: t("Register.validation.emailInvalid"),
          },
        }}
      />

      <FormInput<RegisterFormValues>
        name="password"
        control={control}
        label={t("Register.form.passwordLabel")}
        placeholder={t("Register.form.passwordPlaceholder")}
        type="password"
        rules={{
          required: t("Register.validation.passwordRequired"),
          minLength: {
            value: 6,
            message: t("Register.validation.passwordMin"),
          },
        }}
      />

      <FormInput<RegisterFormValues>
        name="confirmPassword"
        control={control}
        label={t("Register.form.confirmLabel")}
        placeholder={t("Register.form.confirmPlaceholder")}
        type="password"
        rules={{
          required: t("Register.validation.confirmRequired"),
          validate: (val: string) => {
            if (watch("password") != val) {
              return t("Register.validation.mismatch");
            }
          },
        }}
      />

      <CustomButton
        htmlType="submit"
        variant="primary"
        className="w-full mt-4"
        loading={isSubmitting}
      >
        {t("Register.form.submitButton")}
      </CustomButton>
    </Form>
  );
}
