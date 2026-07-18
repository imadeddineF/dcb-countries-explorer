import type { Href } from "expo-router";
import type { SFSymbol } from "sf-symbols-typescript";

export type TabKey = "index" | "countries" | "notifications" | "account";

export type TabConfig = {
  key: TabKey;
  href: Href;
  label: string;
  /** iOS — SF Symbols (native SwiftUI TabView). */
  sf: { default: SFSymbol; selected: SFSymbol };
};

export const TABS: TabConfig[] = [
  {
    key: "index",
    href: "/",
    label: "Home",
    sf: { default: "house", selected: "house.fill" },
  },
  {
    key: "countries",
    href: "/countries",
    label: "Countries",
    sf: { default: "globe", selected: "globe.fill" },
  },
  {
    key: "notifications",
    href: "/notifications",
    label: "Notifications",
    sf: { default: "bell", selected: "bell.fill" },
  },
  {
    key: "account",
    href: "/account",
    label: "Account",
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
