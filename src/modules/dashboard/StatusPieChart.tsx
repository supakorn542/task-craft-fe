import { DashboardPieChartResponseDto } from "@/api/generated";
import { useTranslations } from "next-intl";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type StatusPieChartProps = {
  data: DashboardPieChartResponseDto[];
  loading?: boolean;
};

export default function StatusPieChart({ data }: StatusPieChartProps) {
  const t = useTranslations();

  if (!data || data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        {t("Dashboard.chart.noData")}
      </div>
    );
  }

  const getStatusName = (name: string) => {
    return t(`Dashboard.status.${name}`);
  };

  return (
    <ResponsiveContainer width={"100%"} height={"90%"}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="45%"
          innerRadius="50%"
          outerRadius="80%"
          paddingAngle={5}
          cornerRadius={4}
          labelLine={false}
        >
          {data.map((item, index) => (
            <Cell key={`cell-${index}`} fill={item.color} stroke="none" />
          ))}
          <Tooltip
            formatter={(value: number | undefined, name: string | undefined) => [
              `${value ?? 0} ${t("Dashboard.chart.tasks")}`,
              getStatusName(name ?? ""),
            ]}
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />

          <Legend
            verticalAlign="bottom"
            height={48}
            formatter={getStatusName}
            iconType="circle"
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
