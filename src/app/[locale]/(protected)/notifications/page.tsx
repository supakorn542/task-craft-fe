"use client";

import React, { useEffect, useState } from "react";
import { NotificationResponseDto } from "@/api/generated";
import { apiClient } from "@/api";
import { useNotify } from "@/app/contexts/NotificationContext";
import { getErrorMessage } from "@/utils/error";
import { useRouter } from "@/i18n/navigation";
import { Empty, Spin } from "antd";

import NotificationItem from "@/app/components/Sidebars/NotificationItem";
import PageHeader from "@/app/components/PageHeader";
import ListSkeleton from "@/app/components/Skeletons/ListSkeleton";

export default function NotificationsPage() {
  const notification = useNotify();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<NotificationResponseDto[]>([]);

  // ดึงข้อมูลทั้งหมด
  const getNotificationList = async () => {
    try {
      setLoading(true);
      const res =
        await apiClient.notification.notificationControllerGetAllByUser();
      setList(res);
    } catch (e) {
      notification.showError(
        "Failed to load notifications",
        getErrorMessage(e)
      );
    } finally {
      setLoading(false);
    }
  };

  // Logic กดอ่าน (เหมือนใน Bell เป๊ะ)
  const handleMarkAsRead = async (id: string, taskId?: string) => {
    try {
      // 1. Update UI ทันที (Optimistic)
      setList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
      );

      // 2. ยิง API update
      await apiClient.notification.notificationControllerUpdateIsRead(id);

      // 3. ไปหน้างาน (ถ้ามี taskId)
      if (taskId) {
        router.push(`/tasks?taskId=${taskId}`);
      }
    } catch (e) {
      notification.showError("Action failed", getErrorMessage(e));
      getNotificationList(); // ถ้าพัง ให้โหลดข้อมูลใหม่มาทับ
    }
  };

  useEffect(() => {
    getNotificationList();
  }, []);

  return (
      <div className="flex flex-col gap-4 py-4 px-4 md:px-0 md:pr-4 min-h-screen">
        <PageHeader text={"Notifications"} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 ">
        {loading ? (
          <ListSkeleton count={6} />
        ) : list.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <Empty description="ไม่มีการแจ้งเตือน" />
          </div>
        ) : (
          <div>
            {list.map((item) => (
              <NotificationItem
                key={item.id}
                item={item}
                onClick={() =>
                  handleMarkAsRead(item.id, item.taskId ?? undefined)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
