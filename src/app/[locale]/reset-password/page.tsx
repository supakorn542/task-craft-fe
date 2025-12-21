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

type ResetFormValues = {
  newPassword: string;
  confirmPassword: string;
};

export default function ResetPasswordPage() {
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
      notification.showError("Invalid link", "Missing reset token.");
      router.push("/login");
    }
  }, [token, router, notification]);

  const handleReset = async (data: ResetFormValues) => {
    if (!token) return;

    try {
      await apiClient.auth.authControllerResetPassword({
        token: token,
        newPassword: data.newPassword,
      });

      notification.showSuccess("Password reset successfully! Please login.");
      router.push("/login");
    } catch (e) {
      if (e instanceof ApiError) {

        notification.showError("Reset Failed", e.body?.message || "Invalid or expired token");
      }
    }
  };

  if (!token) return null; 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Set New Password</h1>

        <Form
          layout="vertical"
          onFinish={handleSubmit(handleReset)}
          className="flex flex-col gap-4"
        >
          <FormInput<ResetFormValues>
            name="newPassword"
            control={control}
            label="New Password"
            type="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
          />

          <FormInput<ResetFormValues>
            name="confirmPassword"
            control={control}
            label="Confirm Password"
            type="password"
            rules={{
              required: "Please confirm your password",
              validate: (val: string) => {
                if (watch("newPassword") != val) {
                  return "Passwords do not match";
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
            Reset Password
          </CustomButton>
        </Form>
      </div>
    </div>
  );
}