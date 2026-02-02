import "@ant-design/v5-patch-for-react-19";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend_Deca } from "next/font/google";
import "../globals.css";
import Sidebar from "../components/Sidebars/Sidebar";
import { ReactNode } from "react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { NotificationProvider } from "../contexts/NotificationContext";
import { AuthProvider } from "@/app/contexts/AuthContext";
import { ConfigProvider } from "antd";
import TagProvider from "../contexts/TagContext";
import '@ant-design/v5-patch-for-react-19';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

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
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#FACC15",
                colorText: "#1F1F1F",
                colorLink: "#1F1F1F",
                borderRadius: 8,
                fontFamily: "inherit",
              },
            }}
          >
            <NotificationProvider>
              <AuthProvider>
                <TagProvider>{children}</TagProvider>
              </AuthProvider>
            </NotificationProvider>
          </ConfigProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
