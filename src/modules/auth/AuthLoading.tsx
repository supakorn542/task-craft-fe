"use client";

import { Spin } from "antd";

export default function AuthLoading() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-screen bg-gray-50">
      <div className="text-center">
        <Spin size="large" />
        <p className="mt-4 text-gray-700 font-medium">Authenticating...</p>
      </div>
    </div>
  );
}
