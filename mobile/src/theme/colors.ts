export const palettes = {
  light: {
    background: "#ffffff",
    surface: "#eeeeee",
    text: "#11181c",
    textMuted: "#687076",
    border: "#e6e8eb",
    primary: "#2563eb",
    danger: "#dc2626",
  },
  dark: {
    background: "#0b0d0f",
    surface: "#17191c",
    text: "#ecedee",
    textMuted: "#9ba1a6",
    border: "#2a2e32",
    primary: "#3b82f6",
    danger: "#f87171",
  },
} as const;

export type ThemeColors = {
  [K in keyof (typeof palettes)["light"]]: string;
};
