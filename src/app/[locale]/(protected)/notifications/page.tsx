"use client";

import React, { useEffect, useState } from "react";
import { NotificationResponseDto } from "@/api/generated";
import { apiClient } from "@/api";
import { useNotify } from "@/app/contexts/NotificationContext";
import { getErrorMessage } from "@/utils/error";
import { useRouter } from "@/i18n/navigation";
import { Empty } from "antd";

import NotificationItem from "@/app/components/Sidebars/NotificationItem";
import PageHeader from "@/app/components/PageHeader";
import ListSkeleton from "@/app/components/Skeletons/ListSkeleton";
import { useTranslations } from "next-intl";
import { useSocket } from "@/app/contexts/SocketContext";

export default function NotificationsPage() {
  const t = useTranslations();
  const notification = useNotify();
  const { socket } = useSocket();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<NotificationResponseDto[]>([]);

  const getNotificationList = async () => {
    try {
      setLoading(true);
      const res =
        await apiClient.notification.notificationControllerGetAllByUser();
      setList(res);
    } catch (e) {
      notification.showError(
        t("Notifications.failedToLoad"),
        getErrorMessage(e),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string, taskId?: string) => {
    try {
      setList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isRead: true } : item)),
      );

      await apiClient.notification.notificationControllerUpdateIsRead(id);

      if (taskId) {
        router.push(`/tasks?taskId=${taskId}`);
      }
    } catch (e) {
      notification.showError(
        t("Notifications.actionFailed"),
        getErrorMessage(e),
      );
      getNotificationList();
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = () => {
      getNotificationList();
    };

    socket.on("new_notification", handleNewNotification);

    return () => {
      socket.off("new_notification", handleNewNotification);
    };
  }, [socket]);

  return (
    <div className="flex flex-col gap-4 py-4 px-4 md:px-0 md:pr-4 min-h-screen">
      <PageHeader text={t("Notifications.title")} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 ">
        {loading ? (
          <ListSkeleton count={6} />
        ) : list.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <Empty description={t("Notification.empty")} />
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
