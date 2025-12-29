"use client";

import { ApiError, GetTagListResponseDto } from "@/api/generated";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNotify } from "./NotificationContext";
import { apiClient } from "@/api";
import { useAuth } from "./AuthContext";

type TagContextProps = {
  tags: GetTagListResponseDto[];
  isLoading: boolean;
  refreshTags: () => Promise<void>;
};

const TagContext = createContext<TagContextProps | undefined>(undefined);

export default function TagProvider({ children }: { children: ReactNode }) {
  const [tags, setTags] = useState<GetTagListResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const notification = useNotify();
  const { isLoggedIn } = useAuth();

  const getTagList = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.tag.tagControllerGetTags();
      setTags(res);
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError("Failed to fetch tags", e.body?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      getTagList();
    } else {
      setTags([]);
    }
  }, [isLoggedIn]);

  return (
    <TagContext.Provider value={{ tags, isLoading, refreshTags: getTagList }}>
      {children}
    </TagContext.Provider>
  );
}

export function useTags() {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error("useTags must be used within a TagProvider");
  }
  return context;
}
