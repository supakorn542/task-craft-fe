import { TaskResponseDto } from "@/api/generated";
import React from "react";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Avatar, List, Tag } from "antd";

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
              <div className="flex items-center gap-2">
                <span className="font-medium truncate">{item.title}</span>
                {item.tags.map((tag) => (
                  <Tag color={tag.color} key={tag.id} className="mr-0">
                    {tag.name}
                  </Tag>
                ))}
              </div>
            }
            description={
              <span className="text-xs text-gray-600">
                Updated {dayjs(item.updatedAt).format("DD MMM HH:mm")}
              </span>
            }
          />

          <div className="text-xs font-semibold">{item.status}</div>
        </List.Item>
      )}
    />
  );
}
