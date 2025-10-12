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
  const [user, setUser] = useState<UserDto | null>(null);
  const [authPending, setAuthPending] = useState(true);
  const notification = useNotify();

  const isLoggedIn = !!user;

  const getUser = async () => {
    setAuthPending(true);
    try {
      const data = await apiClient.auth.authControllerGetProfile();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setAuthPending(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await apiClient.auth.authControllerLogin({ email, password });
      await getUser();
      notification?.showSuccess("Login successful", "Welcome back!");
    } catch (e) {
      if (e instanceof ApiError) {
        notification?.showError("Login failed", e.body?.message);
      }
    }
  };

  const logout = async () => {
    try {
      await apiClient.auth.authControllerLogout();
      setUser(null);

      notification?.showSuccess("Logged out", "See you soon!");
    } catch (e) {
      if (e instanceof ApiError) {
        notification?.showError("Logout failed", e.body?.message);
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
