import React, { ButtonHTMLAttributes, ReactNode } from "react";

type CustomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  variant = "primary",
  style,
  ...rest
}) => {
  const baseStyle: React.CSSProperties = {
    padding: "6px 16px",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.2s",
    ...style,
  };

  const primaryStyle: React.CSSProperties = {
    backgroundColor: "#FACC15",
    color: "#000000",
  };

  const secondaryStyle: React.CSSProperties = {
    backgroundColor: "#e5e7eb",
    color: "#111827",
  };

  const [bgColor, setBgColor] = React.useState(
    variant === "primary" ? primaryStyle.backgroundColor : secondaryStyle.backgroundColor
  );

  const hoverColor =
    variant === "primary" ? "#e6b70f" : "#d1d5db";

  return (
    <button
      style={{ ...baseStyle, backgroundColor: bgColor, color: variant === "primary" ? "#000" : "#111827" }}
      onMouseEnter={() => setBgColor(hoverColor)}
      onMouseLeave={() =>
        setBgColor(variant === "primary" ? primaryStyle.backgroundColor : secondaryStyle.backgroundColor)
      }
      {...rest}
    >
      {children}
    </button>
  );
};
