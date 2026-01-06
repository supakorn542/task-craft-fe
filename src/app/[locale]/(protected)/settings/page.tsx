"use client";

import React from "react";
import { Link } from "@/i18n/navigation";

import { RiUserLine, RiPriceTag3Line } from "react-icons/ri";
import PageHeader from "@/app/components/PageHeader";
import { useTranslations } from "next-intl";

export default function SettingsPage() {
  const t = useTranslations();

  const menuItems = [
    {
      href: "/settings/account",
      icon: <RiUserLine className="text-xl" />,
      title: t("Settings.menu.account.title"),
      description: t("Settings.menu.account.description"),
    },
    {
      href: "/settings/tags",
      icon: <RiPriceTag3Line className="text-xl" />,
      title: t("Settings.menu.tags.title"),
      description: t("Settings.menu.tags.description"),
    },
  ];

  return (
    <div className="flex flex-col gap-4 py-4 px-4 md:px-0 md:pr-4 min-h-screen">
      <PageHeader text={t("Settings.title")} />

      <div className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center p-2 md:p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="p-2 md:p-3 bg-gray-100 rounded-lg mr-4">
              {item.icon}
            </div>
            <div>
              <h2 className="text-md md:text-lg font-semibold">{item.title}</h2>
              <p className="text-xs md:text-sm text-gray-500">
                {item.description}
              </p>
            </div>
            <span className="ml-auto text-gray-400">{">"}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
