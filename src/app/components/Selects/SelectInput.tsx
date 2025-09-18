import React from "react";
import {
  Controller,
  Control,
  Path,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { Select, Form } from "antd";

type SelectProps = React.ComponentProps<typeof Select>;

type SelectInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
} & SelectProps;

export function SelectInput<T extends FieldValues>({
  name,
  control,
  label,
  rules,
  ...rest
}: SelectInputProps<T>) {
  return (
    <Form.Item label={label}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <Select
              value={field.value}
              onChange={(val) => field.onChange(val)}
              onBlur={field.onBlur}
              {...rest}
            ></Select>
            {fieldState.error && (
              <span className="ml-1 text-xs text-red-500">
                {fieldState.error.message}
              </span>
            )}
          </>
        )}
      ></Controller>
    </Form.Item>
  );
}
