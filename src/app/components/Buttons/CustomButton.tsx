import React, { ReactNode } from "react";
import { Button, ButtonProps, ConfigProvider } from "antd";

// type CustomButtonProps = {
//   children: ReactNode;
//   variant?: "primary" | "secondary";
//   htmlType?: "button" | "submit" | "reset";
//   onClick?: () => void;
//   loading?: boolean;
//   disabled?: boolean;
// };

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
    borderRadius: 8,
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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FACC15",
          colorPrimaryHover: "#E6B70F",
          colorText: "#1F1F1F",
          colorBgBase: "#F9FAFB",
          borderRadius: 8,
        },
      }}
    >
      {" "}
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
    </ConfigProvider>
  );
};
