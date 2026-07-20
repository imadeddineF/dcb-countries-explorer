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
      className="h-9 cursor-pointer rounded-lg border border-zinc-300 bg-transparent px-2 text-sm transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-900"
    >
      {routing.locales.map((code) => (
        <option key={code} value={code}>
          {labels[code]}
        </option>
      ))}
    </select>
  );
}
