/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TagResponseDto } from './TagResponseDto';
export type TaskResponseDto = {
  id: string;
  title: string;
  description?: string | null;
  status: TaskResponseDto.status;
  dueDate?: string | null;
  tags: Array<TagResponseDto>;
  createdAt: string;
  updatedAt: string;
  /**
   * Timestamp when the task was soft-deleted
   */
  deletedAt?: string | null;
};
export namespace TaskResponseDto {
  export enum status {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
  }
}

