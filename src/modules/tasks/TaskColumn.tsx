import { GetTaskResponseDto } from "@/api/generated";
import { TaskStatus } from "@/types/task";
import { DndContext, useDndContext, useDroppable } from "@dnd-kit/core";
import React, { useMemo } from "react";
import TaskCard from "./TaskCard";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useTranslations } from "next-intl";

type TaskColumnProps = {
  tasks: GetTaskResponseDto[];
  title: string;
  status: TaskStatus;
  onAddTask: () => void;
  onEditTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
};

export default function TaskColumn({
  tasks,
  title,
  status,
  onAddTask,
  onDeleteTask,
  onEditTask,
}: TaskColumnProps) {
  const t = useTranslations();

  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const { over } = useDndContext();

  const isActiveColumn = useMemo(() => {
    if (isOver) return true;

    if (over && tasks.some((t) => t.id === over.id)) {
      return true;
    }

    return false;
  }, [isOver, over, tasks]);

  return (
    <div
      ref={setNodeRef}
      className={`
        flex flex-col w-full p-3 rounded-xl transition-colors duration-200
        overflow-y-auto overflow-x-hidden max-h-[75vh] scrollbar-none
        min-w-[280px] min-h-[200px] snap-center
        ${
          isActiveColumn ? "bg-gray-100 ring-2 ring-gray-200" : "bg-transparent"
        }
      `}
    >
      <h3 className="mb-3 flex items-center gap-2 text-md font-semibold uppercase tracking-wide">
        {title}
        <span className="text-xs text-gray-400">({tasks.length})</span>
      </h3>

      <div className="flex flex-col flex-1 gap-3">
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onEditTask(task.id)}
              onDelete={onDeleteTask}
            />
          ))}
          {tasks.length === 0 && (
            <div className="text-xs text-gray-400 italic">
              {t("Tasks.column.noTasks")}
            </div>
          )}
        </SortableContext>

        <button
          onClick={onAddTask}
          className="w-full cursor-pointer rounded-md border border-dashed border-gray-300 py-2 text-center text-sm text-gray-500 hover:bg-gray-100"
        >
          {t("Tasks.column.addTask")}
        </button>
      </div>
    </div>
  );
}
