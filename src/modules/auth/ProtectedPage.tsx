"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "../../app/contexts/AuthContext";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import AuthLoading from "./AuthLoading";

function makeRedirectTo(pathname: string, searchParams: URLSearchParams) {
  const redirect =
    pathname + (searchParams.toString() ? `?${searchParams}` : "");
  return `?redirect=${encodeURIComponent(redirect)}`;
}

export default function ProtectedPage({ children }: { children: ReactNode }) {
  const auth = useAuth();

  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  const { user, authPending } = auth;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!authPending && !user) {
      router.replace(`/login${makeRedirectTo(pathname, searchParams)}`);
    }
  }, [user, authPending, pathname, searchParams]);

  if (authPending) return <AuthLoading />;

  return user ? <>{children}</> : null;
}
