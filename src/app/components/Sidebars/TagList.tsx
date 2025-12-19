"use client";

import { ApiError, GetTagListResponseDto } from "@/api/generated";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";

import React, { useEffect, useState } from "react";
import { useNotify } from "@/app/contexts/NotificationContext";
import { apiClient } from "@/api";
import clsx from "clsx";
import { useTags } from "@/app/contexts/TagContext";

export default function TagList() {
  // const [tags, setTags] = useState<GetTagListResponseDto[]>([]);
  // const notification = useNotify();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTagId = searchParams.get("tagId");

  const { tags } = useTags();

  // useEffect(() => {
  //   const getUserTags = async () => {
  //     try {
  //       const res = await apiClient.tag.tagControllerGetTags();
  //       setTags(res);
  //     } catch (e) {
  //       if (e instanceof ApiError) {
  //         notification.showError("Get user tags failed", e.body?.message);
  //       }
  //     }
  //   };

  //   getUserTags();
  // }, []);

  const handleSelectTag = (tagId: string) => {
    const isOnTaskPage = pathname === "/tasks";
    const isSameTag = tagId === selectedTagId;

    if (isOnTaskPage && isSameTag) {
      router.push("/tasks");
      return;
    }

    router.push(`/tasks?tagId=${tagId}`);
  };

  return (
    <div>
      <h3 className="px-2 mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        Tags
      </h3>
      <ul className="mt-2 flex flex-col gap-1">
        {tags.map((tag) => (
          <li
            key={tag.id}
            onClick={() => handleSelectTag(tag.id)}
            className={clsx(
              "flex items-center gap-2 text-text-secondary text-sm cursor-pointer p-2 rounded-lg transition-colors",
              selectedTagId === tag.id
                ? "bg-brand-hover font-semibold"
                : "hover:bg-brand-hover"
            )}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: tag.color }}
            ></span>
            <span>{tag.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
