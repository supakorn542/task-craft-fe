"use client";

import React from "react";
import LoginForm from "../../../modules/login/LoginForm";
import Image from "next/image";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-base p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-xl shadow-lg overflow-hidden">
        <div className="hidden md:block w-1/2 relative">
          <Image
            src="/login.jpg"
            alt="Login Background"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="w-full md:w-1/2 bg-white p-6 md:p-10 flex flex-col justify-center">
          <h1 className="text-base md:text-xl sm:text-2xl font-semibold text-text-primary mb-6">
            Welcome Back
          </h1>
          <p className="text-sm md:text-base text-gray-500 mb-8">Please login to your account</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
