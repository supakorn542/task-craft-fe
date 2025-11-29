/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TagResponseDto } from './TagResponseDto';
export type GetTaskResponseDto = {
  id: string;
  title: string;
  description: string;
  status: GetTaskResponseDto.status;
  dueDate: string;
  tags: Array<TagResponseDto>;
  createdAt: string;
  updatedAt: string;
};
export namespace GetTaskResponseDto {
  export enum status {
    TO_DO = 'TO_DO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
  }
}

