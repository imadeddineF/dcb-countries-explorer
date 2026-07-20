import type { Country } from "../types/country";

/**
 * Case-insensitive country search across the fields the lists display:
 * name, region and capital ("africa" should match every African country).
 */
export function filterCountries(
  countries: Country[],
  query: string,
): Country[] {
  const q = query.trim().toLowerCase();
  if (!q) return countries;

  return countries.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q) ||
      (c.capital?.toLowerCase().includes(q) ?? false),
  );
}
