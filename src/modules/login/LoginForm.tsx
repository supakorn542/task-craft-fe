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
import { useTranslations } from "next-intl";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const t = useTranslations();

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
        label={t("Login.form.emailLabel")}
        placeholder={t("Login.form.emailPlaceholder")}
        type="email"
        rules={{ required: t("Login.validation.emailRequired") }}
      />

      <div className="relative">
        <FormInput<LoginFormValues>
          name="password"
          control={control}
          label={t("Login.form.passwordLabel")}
          placeholder={t("Login.form.passwordPlaceholder")}
          type="password"
          rules={{ required: t("Login.validation.passwordRequired") }}
        />

        <div className="flex justify-end -mt-4 mb-4">
          <Link
            href="/forgot-password"
            className="text-xs text-brand hover:underline font-medium"
          >
            {t("Login.form.forgotPassword")}
          </Link>
        </div>
      </div>

      <CustomButton
        htmlType="submit"
        variant="primary"
        loading={isSubmitting}
        className="w-full mt-2"
      >
        {t("Login.form.submitButton")}
      </CustomButton>

      <div className="mt-4 text-center text-sm text-gray-500">
        {t("Login.form.noAccount")}{" "}
        <Link
          href="/register"
          className="font-semibold text-brand hover:underline"
        >
          {t("Login.form.register")}
        </Link>
      </div>
    </Form>
  );
}
