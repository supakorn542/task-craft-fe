import { DashboardTrendResponseDto } from "@/api/generated";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type TrendAreaChartProps = {
  data: DashboardTrendResponseDto[];
  loading?: boolean;
};

export default function TrendAreaChart({ data }: TrendAreaChartProps) {
  if (!data || data.length === 0)
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        No Data
      </div>
    );
  return (
    <ResponsiveContainer width="100%" height="90%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3" vertical={false} />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
        <Area
          type="monotone"
          dataKey="created"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorCreated)"
        />
        <Area
          type="monotone"
          dataKey="completed"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorCompleted)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
