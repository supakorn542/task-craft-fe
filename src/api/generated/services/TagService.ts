/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTagRequestDto } from '../models/CreateTagRequestDto';
import type { CreateTagResponseDto } from '../models/CreateTagResponseDto';
import type { GetTagListResponseDto } from '../models/GetTagListResponseDto';
import type { TagResponseDto } from '../models/TagResponseDto';
import type { UpdateTagRequestDto } from '../models/UpdateTagRequestDto';
import type { UpdateTagResponseDto } from '../models/UpdateTagResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class TagService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns GetTagListResponseDto Get tag list for the current user
   * @throws ApiError
   */
  public tagControllerGetTags(): CancelablePromise<Array<GetTagListResponseDto>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/tag',
    });
  }
  /**
   * @param requestBody
   * @returns CreateTagResponseDto Tag successfully created
   * @throws ApiError
   */
  public tagControllerCreateTag(
    requestBody: CreateTagRequestDto,
  ): CancelablePromise<CreateTagResponseDto> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/tag',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id
   * @param requestBody
   * @returns UpdateTagResponseDto Tag successfully updated
   * @throws ApiError
   */
  public tagControllerUpdateTag(
    id: string,
    requestBody: UpdateTagRequestDto,
  ): CancelablePromise<UpdateTagResponseDto> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/tag/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id
   * @returns TagResponseDto Tag successfully deleted
   * @throws ApiError
   */
  public tagControllerDeleteTag(
    id: string,
  ): CancelablePromise<TagResponseDto> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/tag/{id}',
      path: {
        'id': id,
      },
    });
  }
}
