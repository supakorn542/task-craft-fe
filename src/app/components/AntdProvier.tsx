"use client";

import "@ant-design/v5-patch-for-react-19";

import { ConfigProvider } from "antd";
import { ReactNode } from "react";

export function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FACC15",
          colorText: "#1F1F1F",
          colorLink: "#1F1F1F",
          borderRadius: 8,
          fontFamily: "inherit",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}