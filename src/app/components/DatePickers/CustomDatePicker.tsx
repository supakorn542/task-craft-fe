import React from "react";
import {
  Controller,
  Control,
  Path,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { DatePicker, DatePickerProps, Form } from "antd";
import dayjs, { Dayjs } from "dayjs";

type CustomDatePickerProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
} & DatePickerProps;

export function CustomDatePicker<T extends FieldValues>({
  name,
  control,
  label,
  rules,
  ...rest
}: CustomDatePickerProps<T>) {
  return (
    <Form.Item label={label}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <DatePicker
              value={field.value ? dayjs(field.value) : undefined}
              onChange={(date) =>
                field.onChange(date ? date.toISOString() : null)
              }
              onBlur={field.onBlur}
              {...rest}
            />
            {fieldState.error && (
              <span className="ml-1 text-red-500 text-xs">
                {fieldState.error.message}
              </span>
            )}
          </>
        )}
      ></Controller>
    </Form.Item>
  );
}
