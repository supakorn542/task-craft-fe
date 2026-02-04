import "@ant-design/v5-patch-for-react-19";
import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "../globals.css";
import { ReactNode } from "react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { NotificationProvider } from "../contexts/NotificationContext";
import { AuthProvider } from "@/app/contexts/AuthContext";
import TagProvider from "../contexts/TagContext";
import { AntdProvider } from "../components/AntdProvier";
import { AntdRegistry } from "@ant-design/nextjs-registry";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Craft",
  description: "Manage your tasks efficiently",
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${lexendDeca.className} antialiased`}>
        <NextIntlClientProvider>
          <AntdRegistry>
            <AntdProvider>
              <NotificationProvider>
                <AuthProvider>
                  <TagProvider>{children}</TagProvider>
                </AuthProvider>
              </NotificationProvider>
            </AntdProvider>
          </AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
