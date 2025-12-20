import React from "react";
import {
  Controller,
  Control,
  Path,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { ColorPicker, ColorPickerProps, Form, FormItemProps } from "antd";
import { Color } from "antd/es/color-picker";

type CustomColorPickerProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  formItemProps?: FormItemProps;
} & ColorPickerProps;

export default function CustomColorPicker<T extends FieldValues>({
  name,
  control,
  rules,
  formItemProps,
  ...rest
}: CustomColorPickerProps<T>) {
  return (
    <Form.Item {...formItemProps} style={{ margin: 0, ...formItemProps?.style }}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <ColorPicker
              {...rest}
              value={field.value}
              format="hex"
              onChange={(colorValue: Color) =>
                field.onChange(colorValue.toHexString())
              }
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
