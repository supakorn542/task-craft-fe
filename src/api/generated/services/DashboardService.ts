/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DashboardBarChartResponseDto } from '../models/DashboardBarChartResponseDto';
import type { DashboardPieChartResponseDto } from '../models/DashboardPieChartResponseDto';
import type { DashboardSummaryResponseDto } from '../models/DashboardSummaryResponseDto';
import type { DashboardTrendResponseDto } from '../models/DashboardTrendResponseDto';
import type { TaskResponseDto } from '../models/TaskResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DashboardService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns DashboardPieChartResponseDto
   * @throws ApiError
   */
  public dashboardControllerGetTaskNumberByStatus(): CancelablePromise<Array<DashboardPieChartResponseDto>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/dashboard/status',
    });
  }
  /**
   * @returns DashboardBarChartResponseDto
   * @throws ApiError
   */
  public dashboardControllerGetTagNumberByTask(): CancelablePromise<Array<DashboardBarChartResponseDto>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/dashboard/tags',
    });
  }
  /**
   * @returns DashboardSummaryResponseDto
   * @throws ApiError
   */
  public dashboardControllerGetSummary(): CancelablePromise<DashboardSummaryResponseDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/dashboard/summary',
    });
  }
  /**
   * @returns DashboardTrendResponseDto
   * @throws ApiError
   */
  public dashboardControllerGetSevenDaysAgoTaskNumber(): CancelablePromise<Array<DashboardTrendResponseDto>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/dashboard/trends',
    });
  }
  /**
   * @returns TaskResponseDto
   * @throws ApiError
   */
  public dashboardControllerGetRecentActivities(): CancelablePromise<Array<TaskResponseDto>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/dashboard/recent',
    });
  }
}
