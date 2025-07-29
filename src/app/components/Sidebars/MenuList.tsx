"use client";

import React from "react";

import { LuLayoutDashboard } from "react-icons/lu";
import { FaTasks } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";

import { Link } from "@/i18n/navigation";

export default function MenuList() {
  return (
    <div>
      <ul className="flex flex-col gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#1F2937] text-sm cursor-pointer hover:bg-[#FACC15] p-2 rounded-lg"
        >
          <LuLayoutDashboard />
          <h3>Dashbaord</h3>
        </Link>
        <Link
          href={`/tasks`}
          className="flex items-center gap-2 text-[#1F2937] text-sm cursor-pointer hover:bg-[#FACC15] p-2 rounded-lg"
        >
          <FaTasks />
          <h3>Tasks</h3>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-[#1F2937] text-sm cursor-pointer hover:bg-[#FACC15] p-2 rounded-lg"
        >
          <FaRegCalendarAlt />
          <h3>Calendar</h3>
        </Link>
      </ul>
    </div>
  );
}
