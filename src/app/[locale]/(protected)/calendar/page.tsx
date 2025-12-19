"use client";

import React, { useEffect, useState } from "react";
import { Badge, Calendar, ConfigProvider } from "antd";
import type { BadgeProps, CalendarProps } from "antd";
import type { Dayjs } from "dayjs";
import PageHeader from "@/app/components/PageHeader";
import {
  ApiError,
  GetTaskDetailResponseDto,
  GetTaskResponseDto,
} from "@/api/generated";
import { useNotify } from "@/app/contexts/NotificationContext";
import { apiClient } from "@/api";
import dayjs from "dayjs";
import TaskModal from "@/modules/tasks/TaskModal";
import { Popover } from "antd";

export default function TaskCalendar() {
  const [taskList, setTaskList] = useState<GetTaskResponseDto[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] =
    useState<GetTaskDetailResponseDto | null>(null);
  const [initialDate, setInitialDate] = useState("");

  const [startDate, setStartDate] = useState(
    dayjs().startOf("month").toISOString()
  );
  const [endDate, setEndDate] = useState(dayjs().endOf("month").toISOString());

  const notification = useNotify();

  const handleOpenEditModal = async (id: string) => {
    try {
      const res = await apiClient.task.taskControllerGetTask(id);
      setSelectedTask(res);
      setIsModalOpen(true);
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError("Failed to get task ", e.body?.message);
      }
    }
  };

  const handleOpenAddModal = (value: Dayjs) => {
    const date = value.toISOString();
    setSelectedTask(null);
    setInitialDate(date);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleFormSuccess = () => {
    getTaskList();
    handleCloseModal();
  };

  const getTaskList = async () => {
    try {
      const res = await apiClient.task.taskControllerGetTasks(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        startDate,
        endDate
      );
      setTaskList(res.tasks);
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError("Failed to get task list ", e.body?.message);
      }
    }
  };

  useEffect(() => {
    getTaskList();
  }, [startDate, endDate]);

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    const start = value.startOf("M").toISOString();
    const end = value.endOf("M").toISOString();

    setStartDate(start);
    setEndDate(end);
  };

  const renderTaskItem = (item: GetTaskResponseDto) => {
    const isOverdue =
      dayjs(item.dueDate).isBefore(dayjs(), "day") && item.status !== "DONE";

    return (
      <li
        key={item.id}
        onClick={(e) => {
          e.stopPropagation();
          handleOpenEditModal(item.id);
        }}
        className="flex items-center gap-1 rounded cursor-pointer hover:bg-gray-200 transition-colors"
      >
        <Badge
          status={
            item.status === "DONE"
              ? "success"
              : isOverdue
              ? "error"
              : "processing"
          }
        />
        <span
          className={`text-xs truncate ${
            isOverdue ? "text-red-500 font-bold" : ""
          }`}
        >
          {item.title}
        </span>
      </li>
    );
  };

  const dateCellRender = (value: Dayjs) => {
    const dateCellFormat = value.format("YYYY-MM-DD");

    const taskFilted = taskList.filter((t) => {
      return dayjs(t.dueDate).format("YYYY-MM-DD") === dateCellFormat;
    });

    const popoverContent = (
      <div className="w-64">
        <h4 className="text-sm font-bold mb-2 text-black border-b pb-1">
          {value.format("D MMM YYYY")}
        </h4>
        <ul className="m-0 p-0 list-none max-h-60 overflow-y-auto">
          {taskFilted.map((item) => renderTaskItem(item))}
        </ul>
      </div>
    );

    const MAX_VISIBLE_ITEMS = 2;
    const visibleTasks = taskFilted.slice(0, MAX_VISIBLE_ITEMS);
    const remainingCount = taskFilted.length - MAX_VISIBLE_ITEMS;

    return (
      <ul className="m-0 p-0 list-none">
        {visibleTasks.map((item) => renderTaskItem(item))}
        {remainingCount > 0 && (
          <Popover content={popoverContent} trigger="click" placement="bottom">
            <li
              className="text-xs text-gray-500 pl-4 cursor-pointer hover:text-blue-500 hover:font-bold transition-all"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              + {remainingCount} more
            </li>
          </Popover>
        )}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (
    currentDate,
    info
  ) => {
    if (info.type === "date") {
      return dateCellRender(currentDate);
    }

    return info.originNode;
  };

  return (
    <>
      <div className="flex flex-col gap-2 py-4 pr-4 h-screen overflow-hidden">
        <div className="flex-shrink-0">
          <PageHeader text="Calendar" />
        </div>
        <div className="flex-1 overflow-y-auto bg-bg-base rounded-xl shadow-xl p-6 scrollbar-thin border border-gray-100">
          <ConfigProvider
            theme={{
              components: {
                Calendar: {
                  fullBg: "transparent",
                  itemActiveBg: "#FEF3C7",
                },
              },
            }}
          >
            <Calendar
              onSelect={handleOpenAddModal}
              onPanelChange={onPanelChange}
              cellRender={cellRender}
            />
          </ConfigProvider>
        </div>
      </div>

      <TaskModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleFormSuccess}
        taskToEdit={selectedTask}
        initialDate={initialDate}
      />
    </>
  );
}
