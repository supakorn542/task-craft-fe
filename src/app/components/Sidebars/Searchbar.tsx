'use client'
import React from "react";
import { SearchOutlined } from "@ant-design/icons";

export default function Searchbar() {
  return (
    <div className="w-full flex border border-[#e3dede] gap-2 rounded-lg">
      <div className="text-[#aaa7a8] px-2 py-1 cursor-pointer">
        <SearchOutlined />
      </div>
      <input
        type="text"
        className="px-2 py-1 w-full text-[#464445] placeholder:text-sm"
        placeholder="Search"
      />
    </div>
  );
}
