import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { getCountries, getCountryByCode } from "../services/countries";
import type { Country } from "../types/country";
import { queryKeys } from "./query-keys";

/** React Query hook returning the full, normalized country list. */
export function useCountries(): UseQueryResult<Country[]> {
  return useQuery({
    queryKey: queryKeys.countries.all,
    queryFn: ({ signal }) => getCountries(signal),
    staleTime: 1000 * 60 * 60, // countries rarely change — cache for an hour
  });
}

/** React Query hook returning a single country by alpha code. */
export function useCountry(code: string | undefined): UseQueryResult<Country> {
  return useQuery({
    queryKey: queryKeys.countries.detail(code ?? ""),
    queryFn: ({ signal }) => getCountryByCode(code as string, signal),
    enabled: Boolean(code),
    staleTime: 1000 * 60 * 60,
  });
}
