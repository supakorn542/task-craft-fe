import React from "react";
import type { MenuProps } from "antd";
import { Dropdown, Tooltip } from "antd";
import { useRouter, usePathname } from "@/i18n/navigation";
import { MdLanguage } from "react-icons/md";
import { useTranslations } from "next-intl";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathName = usePathname();

  const t = useTranslations('Sidebar');

  const handleChangeLanguage: MenuProps["onClick"] = ({ key }) => {
    router.push(pathName, { locale: key });
  };

  const items: MenuProps["items"] = [
    {
      key: "en",
      label: t('english'),
    },
    {
      key: "th",
      label: t('thai'),
    },
  ];

  return (
    <>
      <Dropdown menu={{ items, onClick: handleChangeLanguage }}>
        <div className="  cursor-pointer text-text-secondary hover:text-brand-hover transition-colors p-1 rounded-md">
          <MdLanguage className="text-xl" />
        </div>
      </Dropdown>
    </>
  );
}
