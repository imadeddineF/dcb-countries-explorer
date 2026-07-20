"use client";

import {
  filterCountries,
  formatPopulation,
  useCountries,
  useDebounce,
  type Country,
} from "@dcb/shared";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { Link } from "@/i18n/navigation";

export default function CountriesPage() {
  const t = useTranslations("countries");
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const search = useDebounce(query, 300);
  const { data, isPending, isError, refetch } = useCountries();

  const filtered = useMemo(
    () => filterCountries(data ?? [], search),
    [data, search],
  );

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("search")}
        aria-label={t("search")}
        className="mt-6 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-400 dark:focus:ring-zinc-800"
      />

      {isPending ? (
        <div className="mt-16 flex justify-center" role="status">
          <div
            aria-label={t("loading")}
            className="size-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-800 dark:border-zinc-700 dark:border-t-zinc-200"
          />
        </div>
      ) : isError ? (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <p className="text-red-600 dark:text-red-400">{t("error")}</p>
          <button
            onClick={() => refetch()}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            {t("retry")}
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <p className="mt-16 text-center text-zinc-500 dark:text-zinc-400">
          {t("empty")}
        </p>
      ) : (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {filtered.map((country: Country) => (
            <li key={country.code}>
              <Link
                href={`/countries/${country.code}`}
                className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-3 transition hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={country.flagPng}
                  alt={country.flagAlt ?? country.name}
                  loading="lazy"
                  className="h-8 w-12 shrink-0 rounded object-cover"
                />
                <span className="min-w-0">
                  <span className="block truncate font-medium">
                    {country.name}
                  </span>
                  <span className="block text-sm text-zinc-500 dark:text-zinc-400">
                    {country.region} ·{" "}
                    {formatPopulation(country.population, locale)}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
