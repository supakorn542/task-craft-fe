/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTaskRequestDto } from '../models/CreateTaskRequestDto';
import type { CreateTaskResponseDto } from '../models/CreateTaskResponseDto';
import type { GetPaginatedTaskResponseDto } from '../models/GetPaginatedTaskResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class TaskService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @param requestBody
   * @returns CreateTaskResponseDto Task successfully created
   * @throws ApiError
   */
  public taskControllerCreateTask(
    requestBody: CreateTaskRequestDto,
  ): CancelablePromise<CreateTaskResponseDto> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/task',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param status
   * @param priority
   * @param search
   * @param page
   * @param limit
   * @returns GetPaginatedTaskResponseDto Get all tasks of the user with optional filters and pagination
   * @throws ApiError
   */
  public taskControllerGetTasks(
    status?: 'PENDING' | 'IN_PROGRESS' | 'DONE',
    priority?: 'LOW' | 'MEDIUM' | 'HIGH',
    search?: string,
    page?: number,
    limit?: number,
  ): CancelablePromise<GetPaginatedTaskResponseDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/task',
      query: {
        'status': status,
        'priority': priority,
        'search': search,
        'page': page,
        'limit': limit,
      },
    });
  }
}
