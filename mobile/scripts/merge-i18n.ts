import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "fs";
import { join } from "path";

// Custom error class for handling script errors
class ScriptError extends Error {
  constructor(message: unknown) {
    super(`\x1b[31m❌ [Error Processing i18n]: ${message}\x1b[0m`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Start a timer for measuring script execution time
console.time("\x1b[32m[i18n Processing]:\x1b[0m Finished processing i18n in");

// Locales the app actually ships (must match LANGUAGES in
// src/i18n/language-provider.tsx)
const locales = ["en", "es", "fr"] as const;

// Root to scan for per-feature translation namespaces (src/**/i18n/<locale>.json)
const SOURCE_DIR = "./src";
// Merged bundles consumed by the language provider
const OUTPUT_DIR = "./src/messages";
// Infrastructure only (provider/hooks) — not a translation source
const INFRA_I18N_DIR = join(SOURCE_DIR, "i18n");

// Initialize an object to store messages for each locale
const messages: Record<string, Record<string, unknown>> = locales.reduce(
  (acc: Record<string, Record<string, unknown>>, locale: string) => {
    acc[locale] = {};
    return acc;
  },
  {},
);

// Ensure the output directory and a JSON file per locale exist
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}
locales.forEach((locale: string) => {
  const filePath = join(OUTPUT_DIR, `${locale}.json`);
  if (!existsSync(filePath)) {
    writeFileSync(filePath, JSON.stringify(messages[locale] ?? {}), {
      flag: "wx",
    });
  }
});

const processDirectory = (directory: string): void => {
  readdirSync(directory).forEach((file: string) => {
    const absolute = join(directory, file);
    if (!statSync(absolute).isDirectory()) {
      return;
    }

    // Skip infrastructure folder (language provider, not namespaces)
    if (absolute === INFRA_I18N_DIR) {
      return;
    }

    if (file === "i18n") {
      locales.forEach((locale: string) => {
        const filePath = join(absolute, `${locale}.json`);
        if (!existsSync(filePath)) {
          return;
        }

        const raw = readFileSync(filePath, "utf8").trim();
        if (raw.length === 0) {
          return;
        }

        let content: Record<string, unknown>;
        try {
          content = JSON.parse(raw) as Record<string, unknown>;
        } catch (error) {
          throw new ScriptError(`Invalid JSON in ${filePath}: ${error}`);
        }

        const keys = Object.keys(content);
        if (keys.length === 0) {
          throw new ScriptError(`No top-level keys found in ${filePath}`);
        }

        const messagesAtLocale = messages[locale];
        if (messagesAtLocale === undefined) {
          throw new ScriptError(`No messages found for locale ${locale}`);
        }

        // Merge every top-level namespace (root app/i18n may have several)
        for (const key of keys) {
          const value = content[key];
          if (value === undefined) {
            throw new ScriptError(
              `No value found for key ${key} in ${filePath}`,
            );
          }

          if (messagesAtLocale[key] !== undefined) {
            throw new ScriptError(`Duplicate key ${key} found in ${filePath}`);
          }

          messagesAtLocale[key] = value;
        }
      });
    } else {
      processDirectory(absolute);
    }
  });
};

processDirectory(SOURCE_DIR);

locales.forEach((locale: string) => {
  if (messages[locale] !== undefined) {
    writeFileSync(
      join(OUTPUT_DIR, `${locale}.json`),
      JSON.stringify(messages[locale], null, 2),
    );
    console.log(
      `\x1b[32m[i18n Processing]:\x1b[0m Successfully processed locale - ${locale}`,
    );
  }
});

console.timeEnd(
  "\x1b[32m[i18n Processing]:\x1b[0m Finished processing i18n in",
);
