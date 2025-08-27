/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTaskRequestDto } from '../models/CreateTaskRequestDto';
import type { CreateTaskResponseDto } from '../models/CreateTaskResponseDto';
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
}
