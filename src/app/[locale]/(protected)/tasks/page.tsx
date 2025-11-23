"use client";

import React, { useState, useEffect } from "react";
import PageHeader from "../../../components/PageHeader";
import TaskFilter from "../../../components/Tabs/TaskFilter";
import TaskCard from "../../../../modules/tasks/TaskCard";
import { useTranslations } from "next-intl";
import { apiClient } from "@/api";
import {
  ApiError,
  GetTagListResponseDto,
  GetTaskDetailResponseDto,
} from "@/api/generated";
import { useNotify } from "@/app/contexts/NotificationContext";
import { GetTaskResponseDto } from "@/api/generated";
import { FormInput } from "@/app/components/Input/FormInput";
import { useForm, useWatch } from "react-hook-form";
import { SearchOutlined } from "@ant-design/icons";
import TaskModal from "@/modules/tasks/TaskModal";
import { useSearchParams } from "next/navigation";
import { Select } from "antd";
import { SortAscendingOutlined, FilterOutlined } from "@ant-design/icons";
import TaskDeleteModal from "@/modules/tasks/TaskDeleteModal";

type TaskForm = {
  search: string;
};

export default function Tasks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] =
    useState<GetTaskDetailResponseDto | null>(null);
  const t = useTranslations();
  const notification = useNotify();
  const [task, setTask] = useState<GetTaskResponseDto[]>([]);
  const status = Object.values(GetTaskResponseDto.status);
  const [filter, setFilter] = useState<"All" | "Today" | "Upcoming">("All");

  const { control } = useForm<TaskForm>({
    defaultValues: { search: "" },
  });

  const search = useWatch({ control, name: "search" });

  const searchParams = useSearchParams();
  const tagId = searchParams.get("tagId");

  const [sortBy, setSortBy] = useState<"createdAt" | "dueDate">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterTags, setFilterTags] = useState<string[]>(tagId ? [tagId] : []);
  const [tagList, setTagList] = useState<GetTagListResponseDto[]>([]);

  const [deletingTask, setDeletingTask] = useState<GetTaskResponseDto | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  // --- Logic การลบ Task ---

  const handleDeleteTask = (id: string) => {
    const taskToDelete = task.find((t) => t.id === id);
    if (taskToDelete) setDeletingTask(taskToDelete);
  };

  const handleDeleteTaskConfirm = async () => {
    if (!deletingTask) return;
    setIsDeleting(true);
    try {
      await apiClient.task.taskControllerDeleteTask(deletingTask.id);
      notification.showSuccess(`Task deleted successfully`);
      setDeletingTask(null);
      getTasksData();
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError("Failed to delete task", e.body?.message);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenAddTaskModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = async (id: string) => {
    try {
      const res = await apiClient.task.taskControllerGetTask(id);
      setSelectedTask(res);
      setIsModalOpen(true);
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError("Get task detail feiled", e.body?.message);
      }
    }
  };

  const handleFormSuccess = () => {
    getTasksData();
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const getTasksData = async () => {
    try {
      const res = await apiClient.task.taskControllerGetTasks(
        undefined,
        filter.toUpperCase() as "ALL" | "TODAY" | "UPCOMING",
        search || undefined,
        undefined,
        undefined,
        filterTags,
        sortBy,
        sortOrder
      );
      if (res) {
        setTask(res.tasks);
      }
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError("Get Tasks Data Failed", e.body?.message);
      }
    }
  };

  const getTagsData = async () => {
    try {
      const res = await apiClient.tag.tagControllerGetTags();
      if (res) {
        setTagList(res);
      }
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError("Get Tag Data Failed", e.body?.message);
      }
    }
  };

  useEffect(() => {
    getTasksData();
  }, [filter, search, sortBy, sortOrder, filterTags]);

  useEffect(() => {
    getTagsData();
  }, []);

  return (
    <div className="flex flex-col gap-2 py-4 pr-4 min-h-screen">
      <PageHeader text={t("TasksPage.title")} />
      <TaskFilter active={filter} onChange={setFilter} />
      <div className="flex w-full flex-col md:flex-row gap-3 items-center justify-between">
        <div className="w-full">
          <FormInput
            name="search"
            control={control}
            formItemProps={{ style: { marginBottom: 0 } }}
            placeholder="Search tasks..."
            prefix={<SearchOutlined style={{ color: "grey" }} />}
            allowClear
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Select
            mode="multiple"
            placeholder="Filter by Tags"
            style={{ minWidth: 150 }}
            maxTagCount="responsive"
            onChange={setFilterTags}
            options={tagList.map((tag) => ({
              label: tag.name,
              value: tag.id,
            }))}
            suffixIcon={<FilterOutlined />}
          />

          <Select
            defaultValue="createdAt_desc"
            style={{ width: 160 }}
            onChange={(value) => {
              const [field, order] = value.split("_");
              setSortBy(field as any);
              setSortOrder(order as any);
            }}
            options={[
              { label: "Newest Created", value: "createdAt_desc" },
              { label: "Oldest Created", value: "createdAt_asc" },
              { label: "Due Date (Near)", value: "dueDate_asc" },
              { label: "Due Date (Far)", value: "dueDate_desc" },
            ]}
            suffixIcon={<SortAscendingOutlined />}
          />
        </div>
      </div>

      <div className="flex flex-1 justify-between overflow-x-auto">
        {status.map((col) => (
          <div
            key={col}
            className="flex flex-col w-full p-2 overflow-auto max-h-[70vh] scrollbar-none"
          >
            <h3 className="mb-3 flex items-center gap-2 text-md font-semibold uppercase tracking-wide">
              {col === "PENDING"
                ? "To Do"
                : col === "IN_PROGRESS"
                ? "In Progress"
                : "Done"}
              <span className="text-xs text-gray-400"></span>
            </h3>
            <div className="flex flex-col gap-3">
              {task
                .filter((task) => task.status === col)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => handleOpenEditModal(task.id)}
                    onDelete={handleDeleteTask}
                  />
                ))}
              {task.filter((t) => t.status === col).length === 0 && (
                <div className="text-xs text-gray-400 italic">No tasks</div>
              )}

              <button
                onClick={handleOpenAddTaskModal}
                className="w-full cursor-pointer rounded-md border border-dashed border-gray-300 py-2 text-center text-sm text-gray-500 hover:bg-gray-100"
              >
                + Add Task
              </button>
            </div>
          </div>
        ))}
      </div>
      {
        <TaskModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleFormSuccess}
          taskToEdit={selectedTask}
        />
      }
      <TaskDeleteModal
        open={!!deletingTask}
        title={deletingTask?.title}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleDeleteTaskConfirm}
        loading={isDeleting}
      />
    </div>
  );
}
