"use client";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";

export default function TagList() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-[#464445] text-md font-semibold">Tags</h2>
      <ul className="flex flex-col gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#464445] text-sm cursor-pointer hover:bg-[#e0dee0] p-2 rounded-lg"
        >
          <div className="bg-[#f56c6e] w-4 h-4 rounded-sm"></div>
          <h3>Personal</h3>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-[#464445] text-sm cursor-pointer hover:bg-[#e0dee0] p-2 rounded-lg"
        >
          <div className="bg-[#67d7e3]  w-4 h-4 rounded-sm"></div>
          <h3>Work</h3>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-[#464445] text-sm cursor-pointer hover:bg-[#e0dee0] p-2 rounded-lg"
        >
          <div className="bg-[#fed333]  w-4 h-4 rounded-sm"></div>
          <h3>Important</h3>
        </Link>
        <li className="flex items-center gap-2 text-[#464445] text-sm cursor-pointer hover:bg-[#e0dee0] p-2 rounded-lg">
          <FaPlus />
          <h3>Add New Tag</h3>
        </li>
      </ul>
    </div>
  );
}
