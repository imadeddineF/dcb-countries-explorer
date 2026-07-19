"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const labels: Record<string, string> = {
  en: "English",
  fr: "French",
  es: "Spanish",
};

export function LangDropdown() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <select
      name="lang"
      aria-label="Language"
      value={locale}
      onChange={(e) => router.replace(pathname, { locale: e.target.value })}
      className="rounded-md border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-700"
    >
      {routing.locales.map((code) => (
        <option key={code} value={code}>
          {labels[code]}
        </option>
      ))}
    </select>
  );
}
