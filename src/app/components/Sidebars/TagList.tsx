"use client";

import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";

import React from "react";
import clsx from "clsx";
import { useTags } from "@/app/contexts/TagContext";
import { useTranslations } from "next-intl";

export default function TagList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const t = useTranslations();

  const selectedTagId = searchParams.get("tagId");

  const { tags } = useTags();

  const handleSelectTag = (tagId: string) => {
    const isOnTaskPage = pathname === "/tasks";
    const isSameTag = tagId === selectedTagId;

    if (isOnTaskPage && isSameTag) {
      router.push("/tasks");
      return;
    }

    router.push(`/tasks?tagId=${tagId}`);
  };

  const VISIBLE_LIMIT = 6;
  const visibleTags = tags.slice(0, VISIBLE_LIMIT);
  const remainingCount = tags.length - VISIBLE_LIMIT;

  return (
    <div className="mt-4">
      <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {t("Sidebar.tags")}
      </h3>

      <ul className="mt-2 flex flex-col gap-1">
        {visibleTags.map((tag) => (
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

      {remainingCount > 0 && (
        <button
          onClick={() => router.push("/settings/tags")}
          className="w-full text-left px-2 py-2 text-xs text-gray-500 hover:text-brand hover:bg-gray-50 rounded-lg transition-colors mt-1 cursor-pointer"
        >
          {t("Sidebar.moreTags", { count: remainingCount })}
        </button>
      )}
    </div>
  );
}
