"use client";

import React, { useState } from "react";
import CustomModal from "../../app/components/Modals/CustomModal";

type AddTaskModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AddTaskModal({ open, onClose }: AddTaskModalProps) {
  return (
    <>
      <CustomModal
        open={open}
        title="Add New Task"
        onClose={onClose}
        footer={null}
      ></CustomModal>
    </>
  );
}
