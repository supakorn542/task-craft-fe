import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "antd";
import { FormInput } from "../../app/components/Input/FormInput";
import { ApiError } from "@/api/generated";
import { useRouter } from "next/navigation";
import { useNotify } from "@/app/contexts/NotificationContext";
import { useAuth } from "@/app/contexts/AuthContext";
import { CustomButton } from "@/app/components/Buttons/CustomButton";
import { Link } from "@/i18n/navigation";
import { getErrorMessage } from "@/utils/error";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
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
      notification.showError("Login failed", getErrorMessage(e));
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

      <div className="relative">
        <FormInput<LoginFormValues>
          name="password"
          control={control}
          label="Password"
          placeholder="Enter password"
          type="password"
          rules={{ required: "Password is required" }}
        />

        <div className="flex justify-end -mt-4 mb-4">
          <Link
            href="/forgot-password"
            className="text-xs text-brand hover:underline font-medium"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <CustomButton
        htmlType="submit"
        variant="primary"
        loading={isSubmitting}
        className="w-full mt-2"
      >
        Login
      </CustomButton>

      <div className="mt-4 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-brand hover:underline"
        >
          Sign up
        </Link>
      </div>
    </Form>
  );
}
