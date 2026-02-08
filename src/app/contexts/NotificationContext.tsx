"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import { notification } from "antd";
import { useAuth } from "./AuthContext";
import { Socket } from "socket.io-client";

type NotificationContextProps = {
  showSuccess: (msg: string, decs?: string) => void;
  showError: (msg: string, decs?: string) => void;
};

const NotificationContext = createContext<NotificationContextProps | null>(
  null,
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [api, contextHolder] = notification.useNotification();

  const showSuccess = (msg: string, desc?: string) => {
    api.success({
      message: msg,
      description: desc,
    });
  };

  const showError = (msg: string, desc?: string) => {
    api.error({
      message: msg,
      description: desc,
    });
  };

  return (
    <NotificationContext.Provider value={{ showSuccess, showError }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotify = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error("useNotify must be used within NotificationProvider");
  return context;
};
