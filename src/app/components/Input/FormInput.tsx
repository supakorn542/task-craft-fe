import React from "react";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { Input, Form } from "antd";

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
};

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  rules,
  type = "text",
}: FormInputProps<T>) {
  return (
    <Form.Item label={label}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            {type === "password" ? (
              <Input.Password {...field} placeholder={placeholder} />
            ) : (
              <Input {...field} placeholder={placeholder} />
            )}
            {fieldState.error && (
              <span className="bg-red-600">{fieldState.error.message}</span>
            )}
          </>
        )}
      ></Controller>
    </Form.Item>
  );
}
