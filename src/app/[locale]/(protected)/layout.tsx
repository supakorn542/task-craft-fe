"use client";

import Sidebar from "@/app/components/Sidebars/Sidebar";
import ProtectedPage from "../../../modules/auth/ProtectedPage";
import { ReactNode } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedPage>
      <div className="flex h-screen overflow-hidden flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </ProtectedPage>
  );
}
