"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { apiClient } from "@/api";
import { ApiError, UserDto } from "@/api/generated";
import { useNotify } from "./NotificationContext";
import { useTranslations } from "next-intl";

type AuthContextProps = {
  user: UserDto | null;
  isLoggedIn: boolean;
  authPending: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const t = useTranslations();
  const [user, setUser] = useState<UserDto | null>(null);
  const [authPending, setAuthPending] = useState(true);
  const notification = useNotify();

  const isLoggedIn = !!user;

  const getUser = async () => {
    setAuthPending(true);
    try {
      const data = await apiClient.auth.authControllerGetProfile();
      setUser(data);
    } catch (error) {
      setUser(null);
    } finally {
      setAuthPending(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await apiClient.auth.authControllerLogin({ email, password });
      await getUser();

      notification?.showSuccess(
        t("Auth.notifications.loginSuccessTitle"),
        t("Auth.notifications.loginSuccessMessage")
      );
    } catch (e) {
      throw e;
    }
  };

  const logout = async () => {
    try {
      await apiClient.auth.authControllerLogout();
      setUser(null);

      notification?.showSuccess(
        t("Auth.notifications.logoutSuccessTitle"),
        t("Auth.notifications.logoutSuccessMessage")
      );
    } catch (e) {
      if (e instanceof ApiError) {
        notification?.showError(
          t("Auth.notifications.logoutFailed"),
          e.body?.message
        );
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, authPending, isLoggedIn, login, logout, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
