/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthEntity } from '../models/AuthEntity';
import type { LoginDto } from '../models/LoginDto';
import type { UserDto } from '../models/UserDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AuthService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @param requestBody
   * @returns AuthEntity
   * @throws ApiError
   */
  public authControllerLogin(
    requestBody: LoginDto,
  ): CancelablePromise<AuthEntity> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/auth/login',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns any Generate new access token from refresh token
   * @throws ApiError
   */
  public authControllerRefresh(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/auth/refresh',
      errors: {
        401: `Invalid or expired refresh token`,
      },
    });
  }
  /**
   * @returns any Logout and clear cookies
   * @throws ApiError
   */
  public authControllerLogout(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/auth/logout',
      errors: {
        401: `Not logged in`,
      },
    });
  }
  /**
   * @returns UserDto
   * @throws ApiError
   */
  public authControllerGetProfile(): CancelablePromise<UserDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/auth/profile',
      errors: {
        401: `User is not logged in or token is invalid`,
      },
    });
  }
}
