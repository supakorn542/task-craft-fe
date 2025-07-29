"use client";

import React from "react";
import { RiListSettingsLine } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import MenuList from "./MenuList";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Sidebar() {
  return (
    <>
      <aside className={`w-72 h-screen p-4`}>
        <nav className="flex flex-col justify-between bg-[#F9FAFB] rounded-xl h-full p-4 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className="text-[#1F1F1F] text-xl font-semibold">
                Task Craft
              </h1>
              <LanguageSwitcher/>
            </div>
            <div className="flex flex-col gap-4">
              <MenuList />
            </div>
          </div>
          <div>
            <ul>
              <li className="flex items-center gap-2 text-[#464445] text-md cursor-pointer hover:bg-[#FACC15] p-2 rounded-lg">
                <RiListSettingsLine />
                <h3>Settings</h3>
              </li>
              <li className="flex items-center gap-2 text-[#464445] text-md cursor-pointer hover:bg-[#FACC15] p-2 rounded-lg">
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
