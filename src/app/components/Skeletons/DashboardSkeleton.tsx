import React from "react";
import { Skeleton, Card, Row, Col } from "antd";

export default function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="shadow-sm h-24 flex items-center">
            <Skeleton
              active
              title={false}
              paragraph={{ rows: 1, width: "100%" }}
            />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`bg-white rounded-xl shadow-sm p-6 h-80 ${
              i === 1 || i === 4 ? "md:col-span-2" : ""
            }`}
          >
            <Skeleton active paragraph={{ rows: 6 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
