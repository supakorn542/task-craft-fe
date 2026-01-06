"use client";

import React, { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import SidebarContent from "./SidebarContent";
import { usePathname } from "@/i18n/navigation";
import NotificationBell from "./NotificationBell";
import { useTranslations } from "next-intl";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const t = useTranslations();

  const getMobileTitle = () => {
    if (pathname === "/" || pathname === "/dashboard") return t('Sidebar.dashboard');
    if (pathname.includes("/tasks")) return t('Sidebar.myTask');
    if (pathname.includes("/calendar")) return t('Sidebar.calendar');
    if (pathname.includes("/settings")) return t('Sidebar.settings');
    if (pathname.includes("/notifications")) return t('Sidebar.notifications');
    return "Task Craft";
  };

  return (
    <>
      <div className="md:hidden w-full px-2 pt-2 flex items-center justify-between z-40">
        <div className="flex items-center gap-3">
          <Button
            icon={<MenuOutlined />}
            onClick={() => setOpen(true)}
            type="text"
            className="text-text-primary hover:bg-gray-100"
          />
          <span className="font-semibold text-3xl text-text-primary tracking-tight">
            {getMobileTitle()}
          </span>
        </div>
        <div className="flex items-center p-2">
          <NotificationBell />
        </div>
      </div>

      <Drawer
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
        width={280}
        styles={{ body: { padding: 0, backgroundColor: "#F9FAFB" } }}
        closeIcon={null}
      >
        <div className="h-full">
          <SidebarContent />
        </div>
      </Drawer>

      <aside className={`hidden md:block w-64 h-screen p-4`}>
        <SidebarContent />
      </aside>
    </>
  );
}
