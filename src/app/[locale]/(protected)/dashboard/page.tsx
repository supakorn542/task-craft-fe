"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "@/app/components/PageHeader";
import SummaryCards from "@/modules/dashboard/SummaryCards";

import { apiClient } from "@/api";
import {
  ApiError,
  DashboardBarChartResponseDto,
  DashboardPieChartResponseDto,
  DashboardSummaryResponseDto,
  DashboardTrendResponseDto,
  TaskResponseDto,
} from "@/api/generated";
import { useNotify } from "@/app/contexts/NotificationContext";
import StatusPieChart from "@/modules/dashboard/StatusPieChart";
import TagsBarChart from "@/modules/dashboard/TagsBarChart";
import TrendAreaChart from "@/modules/dashboard/TrendAreaChart";
import RecentActivityList from "@/modules/dashboard/RecentActivityList";
import DashboardSkeleton from "@/app/components/Skeletons/DashboardSkeleton";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const [summary, setSummary] = useState<
    DashboardSummaryResponseDto | undefined
  >(undefined);

  const t = useTranslations();

  const [pieData, setPieData] = useState<DashboardPieChartResponseDto[]>([]);
  const [barData, setBarData] = useState<DashboardBarChartResponseDto[]>([]);
  const [trendsData, setTrendsData] = useState<DashboardTrendResponseDto[]>([]);
  const [recentData, setRecentData] = useState<TaskResponseDto[]>([]);

  const [loading, setLoading] = useState(false);
  const notification = useNotify();

  const getDashboardData = async () => {
    setLoading(true);
    try {
      const [summaryRes, pieRes, barRes, trendsRes, recentRes] =
        await Promise.all([
          apiClient.dashboard.dashboardControllerGetSummary(),
          apiClient.dashboard.dashboardControllerGetTaskNumberByStatus(),
          apiClient.dashboard.dashboardControllerGetTagNumberByTask(),
          apiClient.dashboard.dashboardControllerGetSevenDaysAgoTaskNumber(),
          apiClient.dashboard.dashboardControllerGetRecentActivities(),
        ]);
      setSummary(summaryRes);
      setPieData(pieRes);
      setBarData(barRes);
      setTrendsData(trendsRes);
      setRecentData(recentRes);
    } catch (e) {
      if (e instanceof ApiError) {
        notification.showError("Failed to load dashboard data");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-4 md:gap-6 py-4 px-4 md:px-0 md:pr-4">
        <PageHeader text={t("Dashboard.title")} />
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6 py-4 px-4 md:px-0 md:pr-4 ">
      <PageHeader text={t("Dashboard.title")} />

      <SummaryCards data={summary} loading={loading} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="col-span-1 md:col-span-2 h-64 md:h-80 bg-bg-base rounded-xl shadow-sm p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-2 md:mb-4">
            {t("Dashboard.section.weeklyProductivity")}
          </h3>
          <TrendAreaChart data={trendsData} />
        </div>

        <div className="h-64 md:h-80 bg-bg-base rounded-xl shadow-sm p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-2 md:mb-4">
            {t("Dashboard.section.tasksByStatus")}
          </h3>
          <StatusPieChart data={pieData} />
        </div>

        <div className="h-64 md:h-80 bg-bg-base rounded-xl shadow-sm p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-2 md:mb-4">
            {t("Dashboard.section.tasksByTags")}
          </h3>
          <TagsBarChart data={barData} />
        </div>

        <div className="col-span-1 md:col-span-2 bg-bg-base rounded-xl shadow-sm p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-2 md:mb-4">
            {t("Dashboard.section.recentActivities")}
          </h3>

          <div className="max-h-96 overflow-y-auto custom-scrollbar pr-1 md:pr-2">
            <RecentActivityList data={recentData} />
          </div>
        </div>
      </div>
    </div>
  );
}
