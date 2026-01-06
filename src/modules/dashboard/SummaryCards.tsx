"use client";

import React from "react";
import { Card, Statistic } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { DashboardSummaryResponseDto } from "@/api/generated";
import { useTranslations } from "next-intl";

type SummaryCardsProps = {
  data?: DashboardSummaryResponseDto;
  loading?: boolean;
};

export default function SummaryCards({ data, loading }: SummaryCardsProps) {
  const t = useTranslations();
  const cardStyle = { backgroundColor: "#F9FAFB" };
  const bodyStyle = { padding: "12px 16px" };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      <Card
        loading={loading}
        className="shadow-sm"
        style={cardStyle}
        styles={{ body: bodyStyle }}
      >
        <Statistic
          title={
            <span className="text-xs md:text-sm text-gray-500">
              {t("Dashboard.summary.total")}
            </span>
          }
          value={data?.total || 0}
          valueStyle={{ fontSize: "18px", fontWeight: 600 }}
          prefix={<FileTextOutlined className="text-base" />}
        />
      </Card>

      <Card
        loading={loading}
        className="shadow-sm"
        style={cardStyle}
        styles={{ body: bodyStyle }}
      >
        <Statistic
          title={
            <span className="text-xs md:text-sm text-gray-500">
              {t("Dashboard.summary.inProgress")}
            </span>
          }
          value={data?.inProgress || 0}
          valueStyle={{ color: "#faad14", fontSize: "18px", fontWeight: 600 }}
          prefix={<ClockCircleOutlined className="text-base" />}
        />
      </Card>

      <Card
        loading={loading}
        className="shadow-sm"
        style={cardStyle}
        styles={{ body: bodyStyle }}
      >
        <Statistic
          title={
            <span className="text-xs md:text-sm text-gray-500">
              {t("Dashboard.summary.completed")}
            </span>
          }
          value={data?.completed || 0}
          valueStyle={{ color: "#3f8600", fontSize: "18px", fontWeight: 600 }}
          prefix={<CheckCircleOutlined className="text-base" />}
        />
      </Card>

      <Card
        loading={loading}
        className="shadow-sm"
        style={cardStyle}
        styles={{ body: bodyStyle }}
      >
        <Statistic
          title={
            <span className="text-xs md:text-sm text-gray-500">
              {t("Dashboard.summary.overdue")}
            </span>
          }
          value={data?.overdue || 0}
          valueStyle={{ color: "#cf1322", fontSize: "18px", fontWeight: 600 }}
          prefix={<WarningOutlined className="text-base" />}
        />
      </Card>
    </div>
  );
}
