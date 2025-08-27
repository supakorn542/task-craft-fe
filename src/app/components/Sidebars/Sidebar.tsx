"use client";

import React from "react";
import { RiListSettingsLine } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import MenuList from "./MenuList";
import LanguageSwitcher from "./LanguageSwitcher";
import { apiClient } from "@/api";
import { ApiError } from "@/api/generated";
import { useNotify } from "@/app/contexts/NotificationContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

export default function Sidebar() {
  const notification = useNotify();
  const { logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (e) {
      if (e instanceof ApiError) {
        notification?.showError("Logout failed", e.body?.message);
      }
    }
  };
  return (
    <>
      <aside className={`w-72 h-screen p-4`}>
        <nav className="flex flex-col justify-between bg-bg-base rounded-xl h-full p-4 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className="text-text-primary text-xl font-semibold">
                Task Craft
              </h1>
              <LanguageSwitcher />
            </div>
            <div className="flex flex-col gap-4">
              <MenuList />
            </div>
          </div>
          <div>
            <ul>
              <li className="flex items-center gap-2 text-text-secondary text-md cursor-pointer hover:bg-brand-hover p-2 rounded-lg">
                <RiListSettingsLine />
                <h3>Settings</h3>
              </li>
              <li
                className="flex items-center gap-2 text-text-secondary text-md cursor-pointer hover:bg-brand-hover p-2 rounded-lg"
                onClick={() => handleLogout()}
              >
                <FaSignOutAlt />
                <h3>Sign out</h3>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
}
