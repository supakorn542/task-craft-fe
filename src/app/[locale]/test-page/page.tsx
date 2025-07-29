"use client";

import React, { useState } from "react";
import { clsx } from "clsx";             // <– optional helper

type Status = "todo" | "in‑progress" | "done";
type Task = {
  id: string;
  title: string;
  dueDate: string;      // yyyy‑mm‑dd
  tag?: "Work" | "Personal" | "Urgent";
  status: Status;
};

const filters = ["All", "Today", "Upcoming"] as const;

export default function TasksPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("Today");

  /* --------- mock data --------- */
  const mock: Task[] = [
    { id: "1", title: "Design sidebar", dueDate: "2025‑07‑27", status: "todo", tag: "Work" },
    { id: "2", title: "Write API docs", dueDate: "2025‑07‑28", status: "in‑progress", tag: "Personal" },
    { id: "3", title: "Deploy preview", dueDate: "2025‑07‑29", status: "done", tag: "Urgent" },
  ];
  /* -------------------------------- */

  const today = new Date().toISOString().slice(0, 10);

  const shown = mock.filter(t => {
    if (activeFilter === "Today")    return t.dueDate === today;
    if (activeFilter === "Upcoming") return t.dueDate >  today;
    return true;                     // All
  });

  const grouped: Record<Status, Task[]> = { todo: [], "in‑progress": [], done: [] };
  shown.forEach(t => grouped[t.status].push(t));

  return (
    <section className="flex flex-col h-full">
      {/* ---------- Filter Tabs ---------- */}
      <div className="flex gap-4 border-b border-gray-200 px-6">
        {filters.map(f => (
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

      {/* ---------- Kanban Board ---------- */}
      <div className="flex flex-1 overflow-x-auto gap-6 p-6">
        {(["todo", "in‑progress", "done"] as Status[]).map(col => (
          <div key={col} className="w-72 shrink-0">
            {/* column header */}
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
              {col === "todo" ? "To Do" : col === "in‑progress" ? "In Progress" : "Done"}
              <span className="text-xs text-gray-400">({grouped[col].length})</span>
            </h3>

            {/* column body */}
            <div className="flex flex-col gap-3">
              {grouped[col].map(task => (
                <div
                  key={task.id}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition"
                >
                  <p className="text-sm font-medium">{task.title}</p>

                  <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      {/* tag‑dot */}
                      <span
                        className={clsx(
                          "inline-block h-2 w-2 rounded-full",
                          task.tag === "Work"     && "bg-yellow-400",
                          task.tag === "Personal" && "bg-green-400",
                          task.tag === "Urgent"   && "bg-red-400"
                        )}
                      />
                      {task.tag}
                    </span>
                    <span>{task.dueDate}</span>
                  </div>
                </div>
              ))}

              {/* empty state */}
              {grouped[col].length === 0 && (
                <div className="text-xs text-gray-400 italic">No tasks</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
