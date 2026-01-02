/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NotificationResponseDto } from '../models/NotificationResponseDto';
import type { UnreadCountResponseDto } from '../models/UnreadCountResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class NotificationService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns NotificationResponseDto Get all notification by user
   * @throws ApiError
   */
  public notificationControllerGetAllByUser(): CancelablePromise<Array<NotificationResponseDto>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/notification',
    });
  }
  /**
   * @param id
   * @returns NotificationResponseDto Update read status notification
   * @throws ApiError
   */
  public notificationControllerUpdateIsRead(
    id: string,
  ): CancelablePromise<NotificationResponseDto> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/notification/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @returns UnreadCountResponseDto Get unread notification number
   * @throws ApiError
   */
  public notificationControllerGetUnreadCount(): CancelablePromise<UnreadCountResponseDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/notification/unread',
    });
  }
}
