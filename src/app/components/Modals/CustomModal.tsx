"use client";

import React from "react";
import { Modal } from "antd";

export type CustomModalProps = {
  open: boolean;
  title?: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
  width?: number | string;
  children?: React.ReactNode;
  destroyOnHidden?: boolean;
  centered?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  className?: string;
};

export default function CustomModal({
  open,
  title,
  onClose,
  footer,
  width = 520,
  children,
  destroyOnHidden = true,
  centered = true,
  closable = true,
  maskClosable = true,
  className,
}: CustomModalProps) {
  return (
    <Modal
      open={open}
      title={title}
      onCancel={onClose}
      footer={footer}
      width={width}
      centered={centered}
      closable={closable}
      maskClosable={maskClosable}
      destroyOnHidden={destroyOnHidden}
      className={className}
    >
      {children}
    </Modal>
  );
}
