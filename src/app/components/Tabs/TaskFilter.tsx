import clsx from "clsx";
import React, { useState } from "react";

type TaskFilterProps = {
  active: "All" | "Today" | "Upcoming";
  onChange: (value: "All" | "Today" | "Upcoming") => void;
};

export default function TaskFilter({ active, onChange }: TaskFilterProps) {
  const filters = ["All", "Today", "Upcoming"] as const;

  return (
    <div className="flex gap-4 border-b border-gray-200 px-4 md:px-6 overflow-x-auto scrollbar-hide">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={clsx(
            "py-3 text-sm font-medium whitespace-nowrap",
            active === f
              ? "border-b-2 border-brand text-gray-900"
              : "text-gray-500 hover:text-gray-800"
          )}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
