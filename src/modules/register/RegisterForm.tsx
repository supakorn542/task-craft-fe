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

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
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

      notification.showSuccess("Account created successfully!");
      router.push("/login");
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError("Registration failed", e.body?.message);
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
        label="Email"
        placeholder="john@example.com"
        type="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }}
      />

      <FormInput<RegisterFormValues>
        name="password"
        control={control}
        label="Password"
        placeholder="Min 6 characters"
        type="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
      />

      <FormInput<RegisterFormValues>
        name="confirmPassword"
        control={control}
        label="Confirm Password"
        placeholder="Re-enter password"
        type="password"
        rules={{
          required: "Please confirm your password",
          validate: (val: string) => {
            if (watch("password") != val) {
              return "Your passwords do not match";
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
        Create Account
      </CustomButton>
    </Form>
  );
}
