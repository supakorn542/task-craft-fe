/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UserService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Create new user
   * @param requestBody
   * @returns any User created successfully
   * @throws ApiError
   */
  public userControllerCreate(
    requestBody: CreateUserDto,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/user',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * Get all users
   * @returns any List of users returned successfully
   * @throws ApiError
   */
  public userControllerFindAll(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/user',
      errors: {
        401: `Unauthorized`,
        500: `Internal server error`,
      },
    });
  }
  /**
   * Get user
   * @param id
   * @returns any user data returned successfully
   * @throws ApiError
   */
  public userControllerFindOne(
    id: string,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/user/{id}',
      path: {
        'id': id,
      },
      errors: {
        401: `Unauthorized`,
        500: `Internal server error`,
      },
    });
  }
}
