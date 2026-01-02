"use client";

import React from "react";
import { Badge } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns";
import { th } from "date-fns/locale";
import { NotificationResponseDto } from "@/api/generated";

type NotificationItemProps = {
  item: NotificationResponseDto;
  onClick?: (id: string) => void;
};

export default function NotificationItem({
  item,
  onClick,
}: NotificationItemProps) {
  const getMessage = () => {
    try {
      const params = JSON.parse(item.message);
      return `งาน "${params.taskName}" ต้องส่งวันนี้`;
    } catch (e) {
      return item.message;
    }
  };

  const getTime = () => {
    return new Date(item.createdAt).toLocaleString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      onClick={() => onClick?.(item.id)}
      className={`
        flex gap-3 p-3 cursor-pointer transition-colors
        ${item.isRead ? "bg-white opacity-90" : "bg-blue-50"} 
        hover:bg-gray-100
      `}
    >
      <div className="mt-1">
        <div
          className={`p-2 rounded-full ${
            item.isRead ? "bg-gray-100 text-gray-400" : "bg-blue-100 text-brand"
          }`}
        >
          <ClockCircleOutlined />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4
            className={`text-sm ${
              item.isRead
                ? "font-medium text-gray-600"
                : "font-bold text-gray-900"
            }`}
          >
            แจ้งเตือนงานวันนี้
          </h4>
          {!item.isRead && <Badge status="error" />}{" "}
        </div>

        <p className="text-sm text-gray-600 break-words line-clamp-2">
          {getMessage()}
        </p>

        <p className="text-xs text-gray-400 mt-1">{getTime()}</p>
      </div>
    </div>
  );
}
