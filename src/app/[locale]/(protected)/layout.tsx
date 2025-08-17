"use client";

import Sidebar from "@/app/components/Sidebars/Sidebar";
import ProtectedPage from "../../../modules/auth/ProtectedPage";
import { ReactNode } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <ProtectedPage>{children}</ProtectedPage>
      </main>
    </div>
  );
}
