import React from "react";

type PageHeaderProps = {
  text: string;
};

export default function PageHeader({ text }: PageHeaderProps) {
  return (
    <>
      <h1 className="hidden md:block text-3xl font-semibold text-text-primary tracking-tight">{text}</h1>
    </>
  );
}
