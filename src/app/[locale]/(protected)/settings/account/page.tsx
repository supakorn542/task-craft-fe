"use client";
import { apiClient } from "@/api";
import { ApiError } from "@/api/generated";
import { CustomButton } from "@/app/components/Buttons/CustomButton";
import { FormInput } from "@/app/components/Input/FormInput";
import PageHeader from "@/app/components/PageHeader";
import { useAuth } from "@/app/contexts/AuthContext";
import { useNotify } from "@/app/contexts/NotificationContext";
import { Button, Card, Form, Input } from "antd";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type ChangePasswordForm = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function AccountPage() {
  const t = useTranslations();
  const { user } = useAuth();
  const notification = useNotify();
  const [userName, setUserName] = useState(user?.userName || "");

  const { control, handleSubmit, watch, reset } = useForm<ChangePasswordForm>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleUpdateProfile = async () => {
    try {
      await apiClient.user.userControllerUpdateProfile({
        userName,
      });
      notification.showSuccess(t("Account.profile.success"));
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError(t("Account.profile.error"), e.body?.message);
      }
    }
  };

  const newPasswordValue = watch("newPassword");

  const handleChangePassword = async (values: ChangePasswordForm) => {
    try {
      await apiClient.user.userControllerChangePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      notification.showSuccess(t("Account.security.success"));
      reset();
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError(t("Account.security.error"), e.body?.message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4 px-4 md:px-0 md:pr-4 min-h-screen">
      <PageHeader text={t("Account.title")} />
      <section>
        <h3 className="text-md md:text-lg font-semibold mb-4 text-gray-700">
          {t("Account.profile.title")}
        </h3>
        <Card className="shadow-sm">
          <div className="flex flex-col gap-4">
            <div>
              <label>{t("Account.profile.email")}</label>

              <Input value={user?.email} disabled />
            </div>
            <div>
              <label>{t("Account.profile.displayName")}</label>

              <div className="flex gap-2">
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder={t("Account.profile.placeholder")}
                />
                <CustomButton variant="primary" onClick={handleUpdateProfile}>
                  {t("Account.profile.save")}
                </CustomButton>
              </div>
            </div>
          </div>
        </Card>
      </section>
      <section>
        <h3 className="text-md md:text-lg font-semibold mb-4 text-gray-700">
          {t("Account.security.title")}
        </h3>
        <Card className="shadow-sm">
          <Form layout="vertical" onFinish={handleSubmit(handleChangePassword)}>
            <FormInput
              control={control}
              name="oldPassword"
              label={t("Account.security.currentPassword")}
              type="password"
              placeholder={t("Account.security.currentPlaceholder")}
              rules={{
                required: t("Account.security.validation.currentRequired"),
              }}
            />

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <FormInput
                  control={control}
                  name="newPassword"
                  label={t("Account.security.newPassword")}
                  type="password"
                  placeholder={t("Account.security.newPlaceholder")}
                  rules={{
                    required: t("Account.security.validation.newRequired"),
                    minLength: {
                      value: 6,
                      message: t("Account.security.validation.min"),
                    },
                  }}
                />
              </div>

              <div className="w-full">
                <FormInput
                  control={control}
                  name="confirmPassword"
                  label={t("Account.security.confirmPassword")}
                  type="password"
                  placeholder={t("Account.security.confirmPlaceholder")}
                  rules={{
                    required: t("Account.security.validation.confirmRequired"),
                    validate: (value) =>
                      value === newPasswordValue ||
                      t("Account.security.validation.mismatch"),
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end mt-2">
              <CustomButton variant="primary" htmlType="submit">
                {t("Account.security.updateButton")}
              </CustomButton>
            </div>
          </Form>
        </Card>
      </section>
    </div>
  );
}
