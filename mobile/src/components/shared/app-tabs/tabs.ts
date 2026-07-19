import type { Href } from "expo-router";
import type { SFSymbol } from "sf-symbols-typescript";

export type TabKey = "index" | "countries" | "notifications" | "account";

export type TabConfig = {
  key: TabKey;
  href: Href;
  /** i18n key — resolve with t() at render time so labels follow the language. */
  labelKey: string;
  /** iOS — SF Symbols (native SwiftUI TabView). */
  sf: { default: SFSymbol; selected: SFSymbol };
};

export const TABS: TabConfig[] = [
  {
    key: "index",
    href: "/",
    labelKey: "tabs.home",
    sf: { default: "house", selected: "house.fill" },
  },
  {
    key: "countries",
    href: "/countries",
    labelKey: "tabs.countries",
    sf: { default: "globe", selected: "globe.fill" },
  },
  {
    key: "notifications",
    href: "/notifications",
    labelKey: "tabs.notifications",
    sf: { default: "bell", selected: "bell.fill" },
  },
  {
    key: "account",
    href: "/account",
    labelKey: "tabs.account",
    sf: { default: "person.circle", selected: "person.circle.fill" },
  },
];

export function tabKeyFromPathname(pathname: string): TabKey {
  const match = [...TABS]
    .filter((tab) => tab.href !== "/")
    .sort((a, b) => String(b.href).length - String(a.href).length)
    .find((tab) => pathname.startsWith(String(tab.href)));

  return match?.key ?? "index";
}
