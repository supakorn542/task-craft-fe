"use client";

import { ApiError, GetTagListResponseDto } from "@/api/generated";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useNotify } from "@/app/contexts/NotificationContext";
import { apiClient } from "@/api";
import clsx from "clsx";

export default function TagList() {
  const [tags, setTags] = useState<GetTagListResponseDto[]>([]);
  const notification = useNotify();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const selectedTag = searchParams.get("tagId");

  useEffect(() => {
    const getUserTags = async () => {
      try {
        const res = await apiClient.tag.tagControllerGetTags();
        setTags(res);
      } catch (e) {
        if (e instanceof ApiError) {
          notification.showError("Get user tags failed", e.body?.message);
        }
      }
    };

    getUserTags();
  }, []);

  const handleSelectTag = (tagId: string) => {
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );

    if (tagId === selectedTag) {
      currentParams.delete("tagId");
    } else {
      currentParams.set("tagId", tagId);
    }

    const search = currentParams.toString();
    const query = search ? `?${search}` : ``;

    router.push(`${pathName}${query}`);
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
              "flex items-center gap-2 text-text-secondary text-sm cursor-pointer p-2 rounded-lg",
              selectedTag === tag.id
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
