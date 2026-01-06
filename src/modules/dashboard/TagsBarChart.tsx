import { DashboardBarChartResponseDto } from "@/api/generated";
import { useTranslations } from "next-intl";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type TagsBarChartProps = {
  data: DashboardBarChartResponseDto[];
  loading?: boolean;
};

export default function TagsBarChart({ data }: TagsBarChartProps) {
  const t = useTranslations();

  if (!data || data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        {t("Dashboard.chart.noData")}
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3" vertical={false} />

        <XAxis
          dataKey="tagName"
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => {
            const limit = 2;
            if (value.length > limit) {
              return `${value.substring(0, limit)}...`;
            }
            return value;
          }}
        />

        <YAxis allowDecimals={false} axisLine={false} tickLine={false} />

        <Tooltip
          cursor={{ fill: "transparent" }}
          formatter={(value: number) => [`${value} ${t("Dashboard.chart.tasks")}`, t("Dashboard.chart.count")]}
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />

        <Bar dataKey="taskCount" radius={[4, 4, 0, 0]} maxBarSize={50}>
          {data.map((item, index) => (
            <Cell key={`cell-${index}`} fill={item.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
