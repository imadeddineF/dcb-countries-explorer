import { API_BASE_URL, COUNTRY_FIELDS, PAGE_SIZE } from "../constants/api";
import { mapCountries, mapCountry } from "../mappers/country";
import type { CountriesResponse, Country, RawCountry } from "../types/country";
import { ApiError, fetchJson } from "../utils/http";

const FIELDS = COUNTRY_FIELDS.join(",");

export async function getCountries(signal?: AbortSignal): Promise<Country[]> {
  const all: RawCountry[] = [];
  let offset = 0;

  for (;;) {
    const { data } = await fetchJson<CountriesResponse>(
      `${API_BASE_URL}?response_fields=${FIELDS}&limit=${PAGE_SIZE}&offset=${offset}`,
      { signal },
    );
    all.push(...data.objects);
    if (!data.meta?.more || data.objects.length === 0) break;
    offset += data.objects.length;
  }

  return mapCountries(all);
}

export async function getCountryByCode(
  code: string,
  signal?: AbortSignal,
): Promise<Country> {
  const { data } = await fetchJson<CountriesResponse>(
    `${API_BASE_URL}/codes.alpha_3/${encodeURIComponent(code)}?response_fields=${FIELDS}`,
    { signal },
  );

  const first = data.objects[0];
  if (!first) {
    throw new ApiError(`No country found for code "${code}"`, 404);
  }

  return mapCountry(first);
}
