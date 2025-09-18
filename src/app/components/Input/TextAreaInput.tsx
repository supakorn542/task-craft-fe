import React from "react";
import {
  Controller,
  Control,
  Path,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { Input, Form } from "antd";

type TextAreaProps = React.ComponentProps<typeof Input.TextArea>;

type TextAreaInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
} & TextAreaProps;

export function TextAreaInput<T extends FieldValues>({
  name,
  control,
  label,
  rules,
  ...rest
}: TextAreaInputProps<T>) {
  const { TextArea } = Input;
  return (
    <Form.Item label={label}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <TextArea {...field} {...rest} />
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
