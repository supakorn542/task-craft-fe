/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TagResponseDto } from './TagResponseDto';
export type GetTaskDetailResponseDto = {
  id: string;
  title: string;
  description: string;
  status: GetTaskDetailResponseDto.status;
  dueDate: string;
  tags: Array<TagResponseDto>;
};
export namespace GetTaskDetailResponseDto {
  export enum status {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
  }
}

