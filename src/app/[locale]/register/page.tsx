"use client";

import React from "react";
import RegisterForm from "../../../modules/register/RegisterForm";
import Link from "next/link";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-base p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 md:p-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Create an Account
          </h1>
          <p className="text-gray-500 mt-2">
            Start organizing your tasks with Task Craft today.
          </p>
        </div>

        <RegisterForm />

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-brand hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
