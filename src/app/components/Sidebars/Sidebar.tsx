"use client";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import TaskList from "./TaskList";
import Searchbar from "./Searchbar";
import TagList from "./TagList";
import { RiListSettingsLine } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  return (
    <>
      <aside
        className={`w-72 h-screen p-4`}
      >
        <nav className="flex flex-col justify-between bg-[#F4F4F4] rounded-xl h-full p-4">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-[#464445] text-xl font-semibold">
                Task Craft
              </h1>
            </div>
            <div className="flex flex-col gap-4">
              <Searchbar />
              <TaskList />
              <TagList />
            </div>
          </div>
          <div>
            <ul>
              <li className="flex items-center gap-2 text-[#464445] text-md cursor-pointer hover:bg-[#e0dee0] p-2 rounded-lg">
                <RiListSettingsLine />
                <h3>Settings</h3>
              </li>
              <li className="flex items-center gap-2 text-[#464445] text-md cursor-pointer hover:bg-[#e0dee0] p-2 rounded-lg">
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
