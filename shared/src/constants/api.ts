export const API_BASE_URL = "https://api.restcountries.com/countries/v5";

export const DEFAULT_TIMEOUT_MS = 15_000; // 15 seconds

export const COUNTRY_FIELDS = [
  "names.common",
  "names.official",
  "codes.alpha_2",
  "codes.alpha_3",
  "flag.url_png",
  "flag.url_svg",
  "flag.description",
  "capitals",
  "region",
  "subregion",
  "population",
  "languages",
] as const;

export const PAGE_SIZE = 250;
