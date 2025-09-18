import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "antd";
import { FormInput } from "../../app/components/Input/FormInput";
import { ApiError } from "@/api/generated";
import { useRouter } from "next/navigation";
import { useNotify } from "@/app/contexts/NotificationContext";
import { useAuth } from "@/app/contexts/AuthContext";
import { CustomButton } from "@/app/components/Buttons/CustomButton";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();
  const { login } = useAuth();
  const notification = useNotify();

  const handleLogin = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
      router.push("/dashboard");
    } catch (e) {
      if (e instanceof ApiError) {
        notification?.showError("Login failed", e.body?.message);
      }
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(handleLogin)}>
      <FormInput<LoginFormValues>
        name="email"
        control={control}
        label="Email"
        placeholder="Enter email"
        type="email"
        rules={{ required: "Email is required" }}
      />

      <FormInput<LoginFormValues>
        name="password"
        control={control}
        label="Password"
        placeholder="Enter password"
        type="password"
        rules={{ required: "Password is required" }}
      />

      <CustomButton htmlType="submit" variant="primary">Login</CustomButton>
    </Form>
  );
}
