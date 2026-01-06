"use client";

import React, { useEffect, useState } from "react";
import { Badge, Popover } from "antd";
import { BellOutlined } from "@ant-design/icons";
import {
  NotificationResponseDto,
  UnreadCountResponseDto,
} from "@/api/generated";
import { apiClient } from "@/api";
import { useNotify } from "@/app/contexts/NotificationContext";
import { getErrorMessage } from "@/utils/error";
import NotificationItem from "./NotificationItem";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function NotificationBell() {
  const notification = useNotify();

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const t = useTranslations();

  const [unreadCount, setUnreadCount] = useState<UnreadCountResponseDto>();
  const [notificationList, setNotificationList] = useState<
    NotificationResponseDto[]
  >([]);

  const getUnreadCount = async () => {
    try {
      const res =
        await apiClient.notification.notificationControllerGetUnreadCount();
      setUnreadCount(res);
    } catch (e) {
      notification.showError("Get unread count failed", getErrorMessage(e));
    }
  };

  const handleOpenChange = async (open: boolean) => {
    if (open) {
      getNotificationList();
    }
  };

  const getNotificationList = async () => {
    setLoading(true);
    try {
      const res =
        await apiClient.notification.notificationControllerGetAllByUser();
      setNotificationList(res);
    } catch (e) {
      notification.showError(
        "Get notification list failed",
        getErrorMessage(e)
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUnreadCount();
  }, []);

  const handleMarkAsRead = async (id: string, taskId?: string) => {
    try {
      await apiClient.notification.notificationControllerUpdateIsRead(id);
      getNotificationList();
      getUnreadCount();
      if (taskId) {
        router.push(`/tasks?taskId=${taskId}`);
      } else {
        router.push("/tasks");
      }
    } catch (e) {
      notification.showError("Update mark failed", getErrorMessage(e));
    }
  };

  const content = (
    <div className="flex flex-col w-80 max-h-[400px]">
      <div className="p-3 bg-white sticky top-0 z-10 flex justify-between items-center">
        <h3 className="font-semibold text-gray-700 m-0">{t('Sidebar.notifications')}</h3>
      </div>

      <div className="overflow-y-auto flex-1 rounded-lg">
        {loading ? (
          <div className="p-8 text-center text-gray-400">{t('Common.loading')}</div>
        ) : notificationList.length === 0 ? (
          <div className="p-8 text-center text-gray-400">{t('Notifications.empty')}</div>
        ) : (
          notificationList.map((item) => (
            <NotificationItem
              key={item.id}
              item={item}
              onClick={() =>
                handleMarkAsRead(item.id, item.taskId ?? undefined)
              }
            />
          ))
        )}
      </div>

      <div className="p-2 text-center sticky bottom-0">
        <button
          onClick={() => router.push("/notifications")}
          className="text-xs text-brand hover:underline cursor-pointer"
        >
          {t('Common.viewAll')}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Popover
        content={content}
        trigger={"click"}
        placement="bottomRight"
        onOpenChange={handleOpenChange}
      >
        <Badge count={unreadCount?.count}>
          <BellOutlined className="text-lg cursor-pointer" />
        </Badge>
      </Popover>
    </>
  );
}
