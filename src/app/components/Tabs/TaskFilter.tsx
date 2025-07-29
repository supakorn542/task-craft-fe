import clsx from "clsx";
import React, { useState } from "react";

export default function TaskFilter() {
  const filters = ["All", "Today", "Upcoming"] as const;
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("Today");

  return (
    <div className="flex gap-4 border-b border-gray-200 px-6">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setActiveFilter(f)}
          className={clsx(
            "py-3 text-sm font-medium",
            activeFilter === f
              ? "border-b-2 border-[#FACC15] text-gray-900"
              : "text-gray-500 hover:text-gray-800"
          )}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
