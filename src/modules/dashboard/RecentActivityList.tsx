import { TaskResponseDto } from "@/api/generated";
import React from "react";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Avatar, List, Tag, Badge } from "antd";

type RecentActivityListProps = {
  data: TaskResponseDto[];
  loading?: boolean;
};

export default function RecentActivityList({ data }: RecentActivityListProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-gray-400 text-center py-10">
        No recent activities
      </div>
    );
  }

  const getIcon = (task: TaskResponseDto) => {
    const isNew = dayjs(task.createdAt).isSame(dayjs(task.updatedAt), "minute");
    return isNew ? (
      <PlusCircleOutlined className="text-blue-500" />
    ) : (
      <EditOutlined className="text-yellow-500" />
    );
  };

  const formatStatus = (status: string) => {
    return status
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DONE":
        return "text-green-600 bg-green-100";
      case "IN_PROGRESS":
        return "text-yellow-600 bg-yellow-100";
      case "TO_DO":
      default:
        return "text-gray-600 bg-gray-200";
    }
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      split={false}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                icon={getIcon(item)}
                style={{ backgroundColor: "transparent" }}
              />
            }
            title={
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium truncate">{item.title}</span>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <Tag
                      color={tag.color}
                      key={tag.id}
                      className="!mr-0 !text-[10px] !px-1 !leading-tight"
                    >
                      {tag.name}
                    </Tag>
                  ))}
                </div>
              </div>
            }
            description={
              <span className="text-[10px] sm:text-xs text-gray-600">
                Updated {dayjs(item.updatedAt).format("DD MMM HH:mm")}
              </span>
            }
          />

          <div
            className={`text-[10px] sm:text-xs font-medium px-2 py-1 rounded-md ${getStatusColor(
              item.status
            )}`}
          >
            {formatStatus(item.status)}
          </div>
        </List.Item>
      )}
    />
  );
}
