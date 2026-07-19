"use client";

import { useTheme } from "next-themes";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Both icons are always rendered and CSS picks one, so the markup is
  // theme-independent and needs no hydration guard.
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="rounded-md border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-700"
    >
      <span className="dark:hidden">🌙</span>
      <span className="hidden dark:inline">☀️</span>
    </button>
  );
}
