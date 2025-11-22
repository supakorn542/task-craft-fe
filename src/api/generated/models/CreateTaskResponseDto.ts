/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TagResponseDto } from './TagResponseDto';
export type CreateTaskResponseDto = {
  id: string;
  title: string;
  description?: string;
  status: CreateTaskResponseDto.status;
  dueDate?: string;
  tags: Array<TagResponseDto>;
  createdAt: string;
  updatedAt: string;
};
export namespace CreateTaskResponseDto {
  export enum status {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
  }
}

