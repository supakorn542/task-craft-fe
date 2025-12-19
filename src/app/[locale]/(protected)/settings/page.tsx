"use client";

import React from "react";
import { Link } from "@/i18n/navigation"; 

import {
  RiUserLine,
  RiPriceTag3Line,
  RiNotification3Line,
} from "react-icons/ri";
import PageHeader from "@/app/components/PageHeader";

export default function SettingsPage() {


  const menuItems = [
    {
      href: "/settings/account",
      icon: <RiUserLine className="text-xl" />,
      title: "Account",
      description: "Manage your password and account security.",
    },
    {
      href: "/settings/tags",
      icon: <RiPriceTag3Line className="text-xl" />,
      title: "Manage Tags",
      description: "Organize, edit, and delete your tags.",
    },
  ];


  return (
    <div className="flex flex-col gap-4 py-4 pr-4 min-h-screen">
      <PageHeader text={"Settings"} />

      <div className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="p-3 bg-gray-100 rounded-lg mr-4">{item.icon}</div>
            <div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
            <span className="ml-auto text-gray-400">{">"}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}