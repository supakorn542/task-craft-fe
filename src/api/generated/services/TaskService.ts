/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTaskRequestDto } from '../models/CreateTaskRequestDto';
import type { CreateTaskResponseDto } from '../models/CreateTaskResponseDto';
import type { GetPaginatedTaskResponseDto } from '../models/GetPaginatedTaskResponseDto';
import type { GetTaskDetailResponseDto } from '../models/GetTaskDetailResponseDto';
import type { TaskResponseDto } from '../models/TaskResponseDto';
import type { UpdateTaskRequestDto } from '../models/UpdateTaskRequestDto';
import type { UpdateTaskResponseDto } from '../models/UpdateTaskResponseDto';
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
   * @param filter
   * @param search
   * @param page
   * @param limit
   * @param tagIds Filter tasks by tag IDs
   * @param sortBy
   * @param order
   * @returns GetPaginatedTaskResponseDto Get all tasks of the user with optional filters and pagination
   * @throws ApiError
   */
  public taskControllerGetTasks(
    status?: 'TO_DO' | 'IN_PROGRESS' | 'DONE',
    filter: 'ALL' | 'TODAY' | 'UPCOMING' = 'ALL',
    search?: string,
    page?: number,
    limit?: number,
    tagIds?: Array<string>,
    sortBy: 'createdAt' | 'dueDate' = 'createdAt',
    order: 'asc' | 'desc' = 'desc',
  ): CancelablePromise<GetPaginatedTaskResponseDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/task',
      query: {
        'status': status,
        'filter': filter,
        'search': search,
        'page': page,
        'limit': limit,
        'tagIds': tagIds,
        'sortBy': sortBy,
        'order': order,
      },
    });
  }
  /**
   * @param id
   * @returns GetTaskDetailResponseDto Get  task by id
   * @throws ApiError
   */
  public taskControllerGetTask(
    id: string,
  ): CancelablePromise<GetTaskDetailResponseDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/task/{id}',
      path: {
        'id': id,
      },
      errors: {
        404: `Task not found`,
      },
    });
  }
  /**
   * @param id
   * @param requestBody
   * @returns UpdateTaskResponseDto Update Task
   * @throws ApiError
   */
  public taskControllerUpdateTask(
    id: string,
    requestBody: UpdateTaskRequestDto,
  ): CancelablePromise<UpdateTaskResponseDto> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/task/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id
   * @returns TaskResponseDto Delete Task
   * @throws ApiError
   */
  public taskControllerDeleteTask(
    id: string,
  ): CancelablePromise<TaskResponseDto> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/task/{id}',
      path: {
        'id': id,
      },
    });
  }
}
