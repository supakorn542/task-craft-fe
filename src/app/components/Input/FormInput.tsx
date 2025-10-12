import React from "react";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { Input, Form, InputProps, FormItemProps } from "antd";

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
    formItemProps?: FormItemProps;
} & InputProps;

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  rules,
  type = "text",
  formItemProps,
  ...rest
}: FormInputProps<T>) {
  return (
    <Form.Item label={label} {...formItemProps}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            {type === "password" ? (
              <Input.Password {...field} {...rest} />
            ) : (
              <Input {...field} {...rest} />
            )}
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
