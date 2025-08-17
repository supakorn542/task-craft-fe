"use client";

import React, { useState } from "react";
import PageHeader from "../../../components/PageHeader";
import TaskFilter from "../../../components/Tabs/TaskFilter";
import { Status, tasksMock } from "../../../../mock/mockData";
import AddTaskModal from "../../../../modules/tasks/AddTaskModal";
import TaskCard from "../../../../modules/tasks/TaskCard";
import {useTranslations} from 'next-intl';

export default function Tasks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations()

  return (
    <div className="flex flex-col gap-2 py-4 pr-4">
      <PageHeader text={t('TasksPage.title')} />
      <TaskFilter />
      <div className="flex flex-1 justify-between overflow-x-auto">
        {(["todo", "in-progress", "done"] as Status[]).map((col) => (
          <div key={col} className="w-full p-2">
            <h3 className="mb-3 flex items-center gap-2 text-md font-semibold uppercase tracking-wide">
              {col === "todo"
                ? "To Do"
                : col === "in-progress"
                ? "In Progress"
                : "Done"}
              <span className="text-xs text-gray-400"></span>
            </h3>
            <div className="flex flex-col gap-3">
              {tasksMock.map((task) => (
                <TaskCard key={task.id} task={task} onClick={() => {}} />
              ))}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full cursor-pointer rounded-md border border-dashed border-gray-300 py-2 text-center text-sm text-gray-500 hover:bg-gray-100"
              >
                + Add Task
              </button>

              {tasksMock.length === 0 && (
                <div className="text-xs text-gray-400 italic">No tasks</div>
              )}
            </div>
          </div>
        ))}
      </div>
      <AddTaskModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
