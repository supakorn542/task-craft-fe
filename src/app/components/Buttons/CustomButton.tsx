import React, { ReactNode } from "react";
import { Button, ConfigProvider } from "antd";

type CustomButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  htmlType?: "button" | "submit" | "reset";
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  variant = "primary",
  ...rest
}) => {
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
          borderRadius: 8,
          fontWeight: 600,
          color: "#1F1F1F",
        }}
        {...rest}
      >
        {children}
      </Button>
    </ConfigProvider>
  );
};
