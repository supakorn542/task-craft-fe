"use client";
import React from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { FaListCheck } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import Link from "next/link";

export default function TaskList() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-[#464445] text-md font-semibold">Tasks</h2>
      <ul className="flex flex-col gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#464445] text-sm cursor-pointer hover:bg-[#e0dee0] p-2 rounded-lg"
        >
          <AiOutlineDoubleRight className="text-lg" />
          <h3>Upcoming</h3>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-[#464445] text-sm cursor-pointer hover:bg-[#e0dee0] p-2 rounded-lg"
        >
          <FaListCheck className="text-lg" />
          <h3>Today</h3>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-[#464445] text-sm cursor-pointer hover:bg-[#e0dee0] p-2 rounded-lg"
        >
          <SlCalender className="text-lg" />
          <h3>Calendar</h3>
        </Link>
      </ul>
    </div>
  );
}
