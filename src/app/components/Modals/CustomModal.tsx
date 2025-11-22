"use client";

import React from "react";
import { Modal, ModalProps } from "antd";

type CustomModalProps = {
  onClose: () => void;
} & Omit<ModalProps, "onCancel" | "visible">;

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
  ...rest
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
      {...rest}
    >
      {children}
    </Modal>
  );
}
