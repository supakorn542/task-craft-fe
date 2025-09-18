/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GetTaskResponseDto = {
  id: string;
  title: string;
  description?: Record<string, any> | null;
  status: GetTaskResponseDto.status;
  priority: GetTaskResponseDto.priority;
  createdAt: string;
  updatedAt: string;
};
export namespace GetTaskResponseDto {
  export enum status {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
  }
  export enum priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
  }
}

