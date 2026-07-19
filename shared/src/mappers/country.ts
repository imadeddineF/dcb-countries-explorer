import type { Country, RawCountry } from "../types/country";

export function mapCountry(raw: RawCountry): Country {
  const capital =
    raw.capitals?.find((c) => c.attributes?.primary) ?? raw.capitals?.[0];

  return {
    code: raw.codes.alpha_3,
    name: raw.names.common,
    officialName: raw.names.official,
    flagPng: raw.flag.url_png,
    flagSvg: raw.flag.url_svg,
    flagAlt: raw.flag.description,
    capital: capital?.name,
    region: raw.region,
    subregion: raw.subregion,
    population: raw.population,
    languages: raw.languages?.map((l) => l.name) ?? [],
  };
}

/** Maps and alphabetically sorts a list of raw countries by common name. */
export function mapCountries(raw: RawCountry[]): Country[] {
  return raw.map(mapCountry).sort((a, b) => a.name.localeCompare(b.name));
}
