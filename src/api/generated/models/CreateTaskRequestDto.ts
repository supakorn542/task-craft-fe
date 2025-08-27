/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateTaskRequestDto = {
  /**
   * Title of the task
   */
  title: string;
  /**
   * Detailed description of the task
   */
  description?: string;
  /**
   * Current status of the task
   */
  status?: CreateTaskRequestDto.status;
  /**
   * Priority of the task
   */
  priority?: CreateTaskRequestDto.priority;
  /**
   * Due date of the task in ISO string format
   */
  dueDate?: string;
};
export namespace CreateTaskRequestDto {
  /**
   * Current status of the task
   */
  export enum status {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
  }
  /**
   * Priority of the task
   */
  export enum priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
  }
}

