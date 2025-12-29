import React from "react";
import { Skeleton, Card } from "antd";

export default function TaskSkeleton() {
  const columns = [1, 2, 3]; // Mock 3 columns
  return (
    <div className="flex gap-4 overflow-x-auto">
      {columns.map((col) => (
        <div key={col} className="min-w-[280px] md:min-w-[320px] flex-1">
          {/* Header Skeleton */}
          <div className="h-10 bg-gray-200 rounded mb-4 animate-pulse" />
          {/* Cards Skeleton */}
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="shadow-sm">
                 <Skeleton active paragraph={{ rows: 2 }} title={false}/>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}