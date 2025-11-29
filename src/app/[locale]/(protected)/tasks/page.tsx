"use client";

import React, { useState, useEffect } from "react";
import PageHeader from "../../../components/PageHeader";
import TaskFilter from "../../../components/Tabs/TaskFilter";
import TaskCard, { TaskCardOverlay } from "../../../../modules/tasks/TaskCard";
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
import { TaskStatus } from "@/types/task";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  TouchSensor,
  KeyboardSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DropAnimation,
  DragStartEvent,
} from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import TaskColumn from "@/modules/tasks/TaskColumn";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

type TaskForm = {
  search: string;
};

export default function Tasks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] =
    useState<GetTaskDetailResponseDto | null>(null);

  const t = useTranslations();
  const notification = useNotify();

  const [taskList, setTaskList] = useState<GetTaskResponseDto[]>([]);
  const status = Object.values(TaskStatus);
  const [filter, setFilter] = useState<"All" | "Today" | "Upcoming">("All");

  const [initialStatus, setInitialStatus] = useState<TaskStatus | undefined>(
    undefined
  );

  const { control } = useForm<TaskForm>({
    defaultValues: { search: "" },
  });

  const search = useWatch({ control, name: "search" });

  const searchParams = useSearchParams();
  const urlTagId = searchParams.get("tagId");

  const [sortBy, setSortBy] = useState<"createdAt" | "dueDate">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterTags, setFilterTags] = useState<string[]>(
    urlTagId ? [urlTagId] : []
  );
  const [tagList, setTagList] = useState<GetTagListResponseDto[]>([]);

  const [deletingTask, setDeletingTask] = useState<GetTaskResponseDto | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const [activeTask, setActiveTask] = useState<GetTaskResponseDto | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        tolerance: 5,
        delay: 250,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // --- Logic การ Drag & Drop ---

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    const task = taskList.find((t) => t.id === active.id);

    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = taskList.find((t) => t.id === activeId);
    if (!activeTask) return;

    let newStatus: TaskStatus;

    const isOverColumn = status.includes(overId as TaskStatus);

    if (isOverColumn) {
      newStatus = overId as TaskStatus;
    } else {
      const overTask = taskList.find((t) => t.id === overId);
      if (!overTask) return;
      newStatus = overTask.status;
    }

    if (activeTask.status === newStatus) {
      return;
    }

    const updatedTasks = taskList.map((t) => {
      if (t.id === activeId) {
        return { ...t, status: newStatus };
      }
      return t;
    });
    setTaskList(updatedTasks);

    try {
      const updatedStatusTask = await apiClient.task.taskControllerUpdateTask(
        activeId,
        {
          status: newStatus,
        }
      );

      setTaskList((prevList) =>
        prevList.map((t) =>
          t.id === activeId ? (updatedStatusTask as GetTaskResponseDto) : t
        )
      );
      // getTasksData();
    } catch (e) {
      notification.showError("Failed to move task");
      getTasksData();
    }
  };

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  // --- Logic การลบ Task ---

  const handleDeleteTask = (id: string) => {
    const taskToDelete = taskList.find((t) => t.id === id);
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

  const handleOpenAddTaskModal = (status?: TaskStatus) => {
    setSelectedTask(null);
    setInitialStatus(status);
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
    setInitialStatus(undefined);
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
        setTaskList(res.tasks);
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
    if (urlTagId) {
      setFilterTags([urlTagId]);
    } else {
      setFilterTags([]);
    }
  }, [urlTagId]);

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
            value={filterTags}
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
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          {status.map((col) => (
            <TaskColumn
              key={col}
              status={col as TaskStatus}
              title={
                col === "TO_DO"
                  ? "To Do"
                  : col === "IN_PROGRESS"
                  ? "In Progress"
                  : "Done"
              }
              tasks={taskList.filter((t) => t.status === col)}
              onAddTask={() => handleOpenAddTaskModal()}
              onEditTask={(id) => handleOpenEditModal(id)}
              onDeleteTask={handleDeleteTask}
            />
          ))}
          <DragOverlay dropAnimation={dropAnimation}>
            {activeTask ? <TaskCardOverlay task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
      </div>

      {
        <TaskModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleFormSuccess}
          taskToEdit={selectedTask}
          initialStatus={initialStatus}
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
