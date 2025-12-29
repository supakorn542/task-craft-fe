import React from "react";
import { Skeleton, Card } from "antd";

export default function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-2">
      {Array(count).fill(null).map((_, i) => (
        <Card key={i} size="small" className="shadow-sm">
          <Skeleton loading={true} active avatar paragraph={{ rows: 1 }} />
        </Card>
      ))}
    </div>
  );
}