import React from "react";
import clsx from "clsx";
import { Task } from "../../mock/mockData";
import { GetTaskResponseDto } from "@/api/generated";
import { Dropdown, MenuProps } from "antd";
import { MoreOutlined, DeleteOutlined } from "@ant-design/icons";


type TaskCardProps = {
  task: GetTaskResponseDto;
  onClick?: () => void;
  onDelete: (id: string) => void;
};

export default function TaskCard({ task, onClick, onDelete }: TaskCardProps) {
  const items: MenuProps["items"] = [
    {
      key: "delete",
      label: "Delete",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        onDelete(task.id);
      },
    },
  ];
  return (
    <div
      className="group relative rounded-lg border border-gray-200 bg-white p-4 cursor-pointer shadow-sm hover:shadow-md transition"
      onClick={onClick}
    >
      <div className="absolute top-2 right-2 invisible group-hover:visible">
        <Dropdown menu={{ items }} trigger={["click"]}>
          <div
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreOutlined className="text-gray-500 text-lg" />
          </div>
        </Dropdown>
      </div>

      <p className="text-sm font-medium">{task.title}</p>

      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        {task.tags && task.tags.length > 0 && (
          <div>
            {task.tags.map((tag) => {
              return (
                <span className="flex items-center gap-1" key={tag.id}>
                  <span
                    className={clsx(`inline-block h-3 w-3 rounded-full`)}
                    style={{ backgroundColor: tag.color }}
                  />
                  {tag.name}
                </span>
              );
            })}
          </div>
        )}
        <span>
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            : "No due date"}
        </span>
      </div>
    </div>
  );
}
