/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetTaskResponseDto } from './GetTaskResponseDto';
export type GetPaginatedTaskResponseDto = {
  tasks: Array<GetTaskResponseDto>;
  total: number;
  page: number;
  limit: number;
};

