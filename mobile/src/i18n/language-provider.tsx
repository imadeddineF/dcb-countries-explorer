import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import { I18n, type TranslateOptions } from "i18n-js";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import en from "@/messages/en.json";
import es from "@/messages/es.json";
import fr from "@/messages/fr.json";

const STORAGE_KEY = "app.language";

export const LANGUAGES = ["en", "es", "fr"] as const;

export type Language = (typeof LANGUAGES)[number];

function isLanguage(value: unknown): value is Language {
  return LANGUAGES.includes(value as Language);
}

const i18n = new I18n({ en, es, fr });
i18n.enableFallback = true;
i18n.defaultLocale = "en";

function deviceLanguage(): Language {
  const code = getLocales()[0]?.languageCode;
  return isLanguage(code) ? code : "en";
}

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, options?: TranslateOptions) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(deviceLanguage);

  // Restore the persisted choice; until then the device language applies
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (isLanguage(stored)) setLanguageState(stored);
    });
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: (next) => {
        setLanguageState(next);
        AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {
          // best-effort persistence; the in-memory choice still applies
        });
      },
      // Pass the locale per call instead of mutating i18n.locale during
      // render (the React Compiler forbids render-time mutation)
      t: (key, options) => i18n.t(key, { locale: language, ...options }),
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return ctx;
}
