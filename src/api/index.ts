import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { v4 as uuid } from 'uuid';
import { ApiClient, BaseHttpRequest, CancelablePromise, OpenAPIConfig } from './generated';
import { ApiRequestOptions } from './generated/core/ApiRequestOptions';
import { request as __request } from './generated/core/request'

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: InternalAxiosRequestConfig | undefined;
}

export class CustomAxios extends BaseHttpRequest {
  private refreshQueue: RetryQueueItem[] = [];
  private isRefreshing = false;

  private publicInstance = axios.create();
  private authorizedInstance = axios.create({ withCredentials: true });

  constructor(config: OpenAPIConfig) {
    super(config);

    this.publicInstance.interceptors.response.use(
      (res) => res,
      this.handlePublicError.bind(this)
    );

    this.authorizedInstance.interceptors.response.use(
      (res) => res,
      this.handleAuthorizedError.bind(this)
    );
  }

  private async handleAuthorizedError(error: AxiosError) {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
 
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        await apiClient.auth.authControllerRefresh();
        this.refreshQueue.forEach(({ config, resolve, reject }) => {
          this.authorizedInstance.request(config!).then(resolve).catch(reject);
        });
        this.refreshQueue = [];
        this.isRefreshing = false;
        return this.authorizedInstance(originalRequest!);
      }

      return new Promise((resolve, reject) => {
        this.refreshQueue.push({ config: originalRequest, resolve, reject });
      });
    }

    throw error;
  }

  private handlePublicError(error: AxiosError) {
    throw error.response?.data || error;
  }

  public override request<T>(options: ApiRequestOptions): CancelablePromise<T> {
    const isPublic = options.url?.includes('/auth/login') || options.url?.includes('/auth/refresh');
    const instance = isPublic ? this.publicInstance : this.authorizedInstance;
    return __request(this.config, options, instance);
  }
}


export const apiClient = new ApiClient(
  { BASE: process.env.NEXT_PUBLIC_API_URL ?? '', WITH_CREDENTIALS: true },
  CustomAxios
);
