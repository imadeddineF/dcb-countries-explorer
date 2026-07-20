"use client";

import { formatPopulation, useCountry } from "@dcb/shared";
import { useLocale, useTranslations } from "next-intl";
import { use } from "react";

import { Link } from "@/i18n/navigation";

export default function CountryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const t = useTranslations("countryDetail");
  const locale = useLocale();
  const { data: country, isPending, isError, refetch } = useCountry(id);

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      <Link
        href="/countries"
        className="text-sm text-zinc-500 transition hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        ← {t("back")}
      </Link>

      {isPending ? (
        <div className="mt-16 flex justify-center" role="status">
          <div className="size-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-800 dark:border-zinc-700 dark:border-t-zinc-200" />
        </div>
      ) : isError || !country ? (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <p className="text-red-600 dark:text-red-400">{t("error")}</p>
          <button
            onClick={() => refetch()}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            {t("retry")}
          </button>
        </div>
      ) : (
        <article className="mt-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={country.flagPng}
            alt={country.flagAlt ?? country.name}
            className="aspect-[3/2] w-full rounded-2xl border border-zinc-200 object-cover dark:border-zinc-800"
          />
          <h1 className="mt-6 text-3xl font-bold tracking-tight">
            {country.name}
          </h1>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">
            {country.officialName}
          </p>

          <dl className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-zinc-200 bg-white p-5 sm:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-900">
            <div>
              <dt className="text-sm text-zinc-500 dark:text-zinc-400">
                {t("capital")}
              </dt>
              <dd className="mt-0.5 font-medium">{country.capital ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500 dark:text-zinc-400">
                {t("population")}
              </dt>
              <dd className="mt-0.5 font-medium">
                {formatPopulation(country.population, locale)}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500 dark:text-zinc-400">
                {t("region")}
              </dt>
              <dd className="mt-0.5 font-medium">
                {country.subregion
                  ? `${country.region} — ${country.subregion}`
                  : country.region}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500 dark:text-zinc-400">
                {t("languages")}
              </dt>
              <dd className="mt-0.5 font-medium">
                {country.languages.join(", ") || "—"}
              </dd>
            </div>
          </dl>
        </article>
      )}
    </main>
  );
}
