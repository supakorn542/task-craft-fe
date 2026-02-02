"use client";

import React, { useEffect, useState } from "react";
import { Badge, Calendar, ConfigProvider, Spin } from "antd";
import type { CalendarProps } from "antd";
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
import { useTranslations } from "next-intl";

export default function TaskCalendar() {
  const t = useTranslations();
  const [taskList, setTaskList] = useState<GetTaskResponseDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] =
    useState<GetTaskDetailResponseDto | null>(null);
  const [initialDate, setInitialDate] = useState("");
  const [startDate, setStartDate] = useState(
    dayjs().startOf("month").toISOString()
  );
  const [endDate, setEndDate] = useState(dayjs().endOf("month").toISOString());

  const [isLoading, setIsLoading] = useState(false);

  const notification = useNotify();

  const handleOpenEditModal = async (id: string) => {
    try {
      const res = await apiClient.task.taskControllerGetTask(id);
      setSelectedTask(res);
      setIsModalOpen(true);
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError(t("Calendar.error.fetchTask"), e.body?.message);
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
    setIsLoading(true);
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
        notification.showError(t("Calendar.error.fetchList"), e.body?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTaskList();
  }, [startDate, endDate]);

  const onPanelChange = (value: Dayjs) => {
    const start = value.startOf("M").toISOString();
    const end = value.endOf("M").toISOString();
    setStartDate(start);
    setEndDate(end);
  };

  const renderTaskItemDesktop = (item: GetTaskResponseDto) => {
    const isOverdue =
      dayjs(item.dueDate).isBefore(dayjs(), "day") && item.status !== "DONE";
    return (
      <li
        key={item.id}
        onClick={(e) => {
          e.stopPropagation();
          handleOpenEditModal(item.id);
        }}
        className="flex items-center gap-1 rounded cursor-pointer hover:bg-gray-200 transition-colors mb-1 px-1"
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
            isOverdue ? "text-red-500 font-bold" : "text-gray-700"
          }`}
        >
          {item.title}
        </span>
      </li>
    );
  };

  const dateCellRender = (value: Dayjs) => {
    const dateCellFormat = value.format("YYYY-MM-DD");
    const taskFiltered = taskList.filter((t) => {
      return dayjs(t.dueDate).format("YYYY-MM-DD") === dateCellFormat;
    });

    if (taskFiltered.length === 0) return null;

    const popoverContent = (
      <div className="w-64">
        <h4 className="text-sm font-bold mb-2 text-black border-b pb-1">
          {value.format("D MMM YYYY")}
        </h4>
        <ul className="m-0 p-0 list-none max-h-60 overflow-y-auto">
          {taskFiltered.map((item) => renderTaskItemDesktop(item))}
        </ul>
      </div>
    );

    const MAX_VISIBLE_ITEMS = 2;
    const visibleTasks = taskFiltered.slice(0, MAX_VISIBLE_ITEMS);
    const remainingCount = taskFiltered.length - MAX_VISIBLE_ITEMS;

    return (
      <>
        <div className="md:hidden flex justify-center gap-0.5 mt-1 flex-wrap px-1">
          {taskFiltered.slice(0, 4).map((task) => (
            <div
              key={task.id}
              className={`w-1.5 h-1.5 rounded-full ${
                task.status === "DONE"
                  ? "bg-green-500"
                  : dayjs(task.dueDate).isBefore(dayjs(), "day")
                  ? "bg-red-500"
                  : "bg-blue-400"
              }`}
            />
          ))}
          {taskFiltered.length > 4 && (
            <span className="text-[8px] leading-none text-gray-400">+</span>
          )}
        </div>

        <ul className="hidden md:block m-0 p-0 list-none mt-2">
          {visibleTasks.map((item) => renderTaskItemDesktop(item))}
          {remainingCount > 0 && (
            <Popover
              content={popoverContent}
              trigger="click"
              placement="bottom"
            >
              <li
                className="text-xs text-gray-500 pl-4 cursor-pointer hover:text-blue-500 hover:font-bold transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {t("Calendar.more", { count: remainingCount })}
              </li>
            </Popover>
          )}
        </ul>
      </>
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
      <div className="flex flex-col gap-2 py-4 pr-2 md:pr-4 h-screen overflow-hidden">
        <div className="shrink-0">
          <PageHeader text={t("Calendar.title")} />
        </div>

        <div className="flex-1 overflow-y-auto bg-bg-base rounded-xl shadow-xl p-2 md:p-6 scrollbar-thin border border-gray-100">
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
              <Spin size="large" />
            </div>
          )}
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
