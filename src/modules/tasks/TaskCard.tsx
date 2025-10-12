import React from "react";
import clsx from "clsx";
import { Task } from "../../mock/mockData";
import { GetTaskResponseDto } from "@/api/generated";

type TaskCardProps = {
  task: GetTaskResponseDto;
  onClick?: () => void;
};

export default function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <div
      className="rounded-lg border border-gray-200 bg-white p-4 cursor-pointer shadow-sm hover:shadow-md transition"
      onClick={onClick}
    >
      <p className="text-sm font-medium">{task.title}</p>

      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        {/* <span className="flex items-center gap-1">
          <span
            className={clsx(
              "inline-block h-2 w-2 rounded-full",
              task.tag === "Work" && "bg-yellow-400",
              task.tag === "Personal" && "bg-green-400",
              task.tag === "Urgent" && "bg-red-400"
            )}
          />
          {task.tag}
        </span> */}
        <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }) : "No due date"}</span>
      </div>
    </div>
  );
}
