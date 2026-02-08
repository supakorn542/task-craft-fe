"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { useNotify } from "./NotificationContext";
import { useTranslations } from "next-intl";

type SocketContextProps = {
  socket: Socket | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth();

  const t = useTranslations();
  const notification = useNotify();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL;

    const newSocket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket"],
      reconnectionAttempts: 5,
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    newSocket.on("new_notification", (data: any) => {
      let description = data.message;

      try {
        const parsed = JSON.parse(data.message);
        description = parsed.taskName
          ? t("Notifications.taskDue", { taskName: parsed.taskName })
          : data.message;
      } catch (e) {}
      notification.showSuccess(t(data.title) || "แจ้งเตือนใหม่", description);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [isLoggedIn]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return context;
};
