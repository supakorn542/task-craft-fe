import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import MenuList from "./MenuList";
import TagList from "./TagList";
import { FaSignOutAlt } from "react-icons/fa";
import { RiListSettingsLine } from "react-icons/ri";
import { useNotify } from "@/app/contexts/NotificationContext";
import { useAuth } from "@/app/contexts/AuthContext";
import { ApiError } from "@/api/generated";
import { Link, useRouter } from "@/i18n/navigation";
import NotificationBell from "./NotificationBell";

export default function SidebarContent() {
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
    <nav className="flex flex-col justify-between bg-bg-base rounded-xl h-full p-4 shadow-xl">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-text-primary text-2xl font-semibold tracking-tight">
            Task Craft
          </h1>
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <NotificationBell />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <MenuList />
          <TagList />
        </div>
      </div>
      <div>
        <ul>
          <Link href="/settings" className="w-full">
            <div className="flex items-center gap-2 text-text-secondary text-sm cursor-pointer hover:bg-brand-hover p-2 rounded-lg transition-colors">
              <RiListSettingsLine />
              <h3>Settings</h3>
            </div>
          </Link>
          <li
            className="flex items-center gap-2 text-text-secondary text-sm cursor-pointer hover:bg-brand-hover p-2 rounded-lg transition-colors"
            onClick={() => handleLogout()}
          >
            <FaSignOutAlt />
            <h3>Sign out</h3>
          </li>
        </ul>
      </div>
    </nav>
  );
}
