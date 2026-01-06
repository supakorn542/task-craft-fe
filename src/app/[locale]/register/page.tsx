"use client";

import React from "react";
import RegisterForm from "../../../modules/register/RegisterForm";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Register() {
  const t = useTranslations();
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-base p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 md:p-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {t("Register.title")}
          </h1>
          <p className="text-gray-500 mt-2">
            {t("Register.subtitle")}
          </p>
        </div>

        <RegisterForm />

        <div className="mt-6 text-center text-sm text-gray-500">
          {t("Register.alreadyAccount")}{" "}
          <Link
            href="/login"
            className="font-semibold text-brand hover:underline"
          >
            {t("Register.login")}
          </Link>
        </div>
      </div>
    </div>
  );
}
