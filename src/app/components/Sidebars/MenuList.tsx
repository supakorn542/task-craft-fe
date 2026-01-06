"use client";

import React from "react";

import { LuLayoutDashboard } from "react-icons/lu";
import { FaTasks } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function MenuList() {
  const t = useTranslations();

  return (
    <div>
      <ul className="flex flex-col gap-2 ">
        <Link href="/dashboard" className=" w-full">
          <div
            className="
              flex items-center gap-2 p-2 rounded-lg text-sm cursor-pointer transition-colors
              text-text-secondary
              hover:bg-brand-hover
            "
          >
            <LuLayoutDashboard />
            <h3>{t("Sidebar.dashboard")}</h3>
          </div>
        </Link>

        <Link href={`/tasks`} className="w-full">
          <div
            className="
              flex items-center gap-2 p-2 rounded-lg text-sm cursor-pointer transition-colors
              text-text-secondary
              hover:bg-brand-hover
            "
          >
            <FaTasks />
            <h3>{t("Sidebar.tasks")}</h3>
          </div>
        </Link>

        <Link href="/calendar" className="w-full">
          <div
            className="
              flex items-center gap-2 p-2 rounded-lg text-sm cursor-pointer transition-colors
              text-text-secondary
              hover:bg-brand-hover
            "
          >
            <FaRegCalendarAlt />
            <h3>{t("Sidebar.calendar")}</h3>
          </div>
        </Link>
      </ul>
    </div>
  );
}
