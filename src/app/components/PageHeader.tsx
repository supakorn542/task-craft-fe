import React from "react";

type PageHeaderProps = {
  text: string;
};

export default function PageHeader({ text }: PageHeaderProps) {
  return (
    <>
      <h1 className="text-5xl font-semibold text-[#1F1F1F]">{text}</h1>
    </>
  );
}
