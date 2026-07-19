/** Locale-aware population formatting (41575585 → "41,575,585"). */
export function formatPopulation(population: number, locale?: string): string {
  return new Intl.NumberFormat(locale).format(population);
}
