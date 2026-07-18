import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { Appearance, useColorScheme } from "react-native";

import { palettes, type ThemeColors } from "./colors";

const STORAGE_KEY = "app.theme";

export type ThemeMode = "system" | "light" | "dark";

type ThemeContextValue = {
  scheme: "light" | "dark";
  colors: ThemeColors;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const scheme: "light" | "dark" = systemScheme === "dark" ? "dark" : "light";

  // Restore the persisted override on launch
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored === "light" || stored === "dark") {
        Appearance.setColorScheme(stored);
      }
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      scheme,
      colors: palettes[scheme],
      setMode: (mode) => {
        Appearance.setColorScheme(mode === "system" ? "unspecified" : mode);
        AsyncStorage.setItem(STORAGE_KEY, mode).catch(() => {});
      },
    }),
    [scheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
