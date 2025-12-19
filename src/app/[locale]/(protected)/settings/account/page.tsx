"use client";
import { apiClient } from "@/api";
import { ApiError } from "@/api/generated";
import { CustomButton } from "@/app/components/Buttons/CustomButton";
import { FormInput } from "@/app/components/Input/FormInput";
import PageHeader from "@/app/components/PageHeader";
import { useAuth } from "@/app/contexts/AuthContext";
import { useNotify } from "@/app/contexts/NotificationContext";
import { Button, Card, Form, Input } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type ChangePasswordForm = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function AccountPage() {
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
      notification.showSuccess("Profile updated successfully");
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError("Failed to updated", e.body?.message);
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
      notification.showSuccess("Password changed successfully");
      reset();
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError("Failed to change password", e.body?.message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4 pr-4 min-h-screen">
      <PageHeader text={"Account"} />
      <section>
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Profile</h3>
        <Card className="shadow-sm">
          <div className="flex flex-col gap-4">
            <div>
              <label>Email</label>

              <Input value={user?.email} disabled />
            </div>
            <div>
              <label>Display Name</label>

              <div className="flex gap-2">
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Set your display name"
                />
                <CustomButton variant="primary" onClick={handleUpdateProfile}>
                  Save
                </CustomButton>
              </div>
            </div>
          </div>
        </Card>
      </section>
      <section>
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Security</h3>
        <Card className="shadow-sm">
          <Form layout="vertical" onFinish={handleSubmit(handleChangePassword)}>
            <FormInput
              control={control}
              name="oldPassword"
              label="Current Password"
              type="password"
              placeholder="Enter current password"
              rules={{ required: "Current password is required" }}
            />

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <FormInput
                  control={control}
                  name="newPassword"
                  label="New Password"
                  type="password"
                  placeholder="New password"
                  rules={{
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Min 6 characters",
                    },
                  }}
                />
              </div>

              <div className="w-full">
                <FormInput
                  control={control}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm new password"
                  rules={{
                    required: "Confirm password is required",

                    validate: (value) =>
                      value === newPasswordValue || "Passwords do not match!",
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end mt-2">
              <CustomButton variant="primary" htmlType="submit">
                Update Password
              </CustomButton>
            </div>
          </Form>
        </Card>
      </section>
    </div>
  );
}
