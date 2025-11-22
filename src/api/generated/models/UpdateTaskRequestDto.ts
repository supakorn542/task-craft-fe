/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateTaskRequestDto = {
  /**
   * Title of the task
   */
  title?: string;
  /**
   * Detailed description of the task
   */
  description?: string | null;
  /**
   * Current status of the task
   */
  status?: UpdateTaskRequestDto.status;
  /**
   * Due date of the task in ISO string format
   */
  dueDate?: string | null;
  /**
   * Array of tag IDs or new tag names
   */
  tags?: Array<string>;
};
export namespace UpdateTaskRequestDto {
  /**
   * Current status of the task
   */
  export enum status {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
  }
}

