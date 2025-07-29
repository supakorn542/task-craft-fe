import React from "react";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { useRouter, usePathname } from "@/i18n/navigation";
import { MdLanguage } from "react-icons/md";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathName = usePathname();
  const locale = useLocale();

  const handleChangeLanguage: MenuProps["onClick"] = ({ key }) => {
    router.push(pathName, {locale: key})
  }

  const items: MenuProps["items"] = [
  {
    key: "en",
    label: "English",
  },
  {
    key: "th",
    label: "Thai",
  },
];

  const localeLableMap: Record<string, string> = {
    en: "English",
    th: "Thai",
  };

  return (
    <>
      <Dropdown menu={{ items, onClick: handleChangeLanguage }}>
        <div className="flex items-center gap-1 cursor-pointer text-md">
          <MdLanguage />
          {localeLableMap[locale] ?? "Language"}
        </div>
      </Dropdown>
    </>
  );
}
