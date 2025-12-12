"use client";

import React from "react";
import { Card, Statistic } from "antd"; // ❌ ไม่ต้อง import Row, Col แล้ว
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { DashboardSummaryResponseDto } from "@/api/generated";

type SummaryCardsProps = {
  data?: DashboardSummaryResponseDto;
  loading?: boolean;
};

export default function SummaryCards({ data, loading }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <Card
        loading={loading}
        hoverable
        className="shadow-sm"
        style={{ backgroundColor: "#F9FAFB" }}
      >
        <Statistic
          title="Total Tasks"
          value={data?.total || 0}
          prefix={<FileTextOutlined />}
        />
      </Card>

      <Card
        loading={loading}
        hoverable
        className="shadow-sm"
        style={{ backgroundColor: "#F9FAFB" }}
      >
        <Statistic
          title="In Progress"
          value={data?.inProgress || 0}
          prefix={<ClockCircleOutlined />}
          valueStyle={{ color: "#faad14" }}
        />
      </Card>

      <Card
        loading={loading}
        hoverable
        className="shadow-sm"
        style={{ backgroundColor: "#F9FAFB" }}
      >
        <Statistic
          title="Completed"
          value={data?.completed || 0}
          prefix={<CheckCircleOutlined />}
          valueStyle={{ color: "#3f8600" }}
        />
      </Card>

      <Card
        loading={loading}
        hoverable
        className="shadow-sm"
        style={{ backgroundColor: "#F9FAFB" }}
      >
        <Statistic
          title="Overdue"
          value={data?.overdue || 0}
          prefix={<WarningOutlined />}
          valueStyle={{ color: "#cf1322" }}
        />
      </Card>
    </div>
  );
}
