import React, { ReactNode } from "react";
import { Button, ButtonProps } from "antd";

type CustomButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost";
} & Omit<ButtonProps, "variant">;

export const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  variant = "primary",
  style,
  ...rest
}) => {
  const mergedStyle: React.CSSProperties = {
    fontWeight: 600,
    ...style,
  };
  if (variant === "ghost" || variant === "secondary" || variant === "outline") {
    return (
      <Button
        type={variant === "ghost" ? "text" : "default"}
        style={mergedStyle}
        {...rest}
      >
        {children}
      </Button>
    );
  }
  return (
    <Button
      type={variant === "primary" ? "primary" : "default"}
      style={{
        color: "#1F1F1F",
        ...mergedStyle,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};
