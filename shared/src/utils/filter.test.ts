import { describe, expect, it } from "vitest";

import type { Country } from "../types/country";
import { filterCountries } from "./filter";

const make = (partial: Partial<Country>): Country => ({
  code: "XXX",
  name: "Testland",
  officialName: "Republic of Testland",
  flagPng: "",
  flagSvg: "",
  region: "Nowhere",
  population: 1,
  languages: [],
  ...partial,
});

const countries = [
  make({ code: "DZA", name: "Algeria", region: "Africa", capital: "Algiers" }),
  make({ code: "ZAF", name: "South Africa", region: "Africa" }),
  make({ code: "FRA", name: "France", region: "Europe", capital: "Paris" }),
];

describe("filterCountries", () => {
  it("returns everything for an empty query", () => {
    expect(filterCountries(countries, "  ")).toHaveLength(3);
  });

  it("matches by region, not just name", () => {
    expect(filterCountries(countries, "africa").map((c) => c.code)).toEqual([
      "DZA",
      "ZAF",
    ]);
  });

  it("matches by capital", () => {
    expect(filterCountries(countries, "paris")[0]?.code).toBe("FRA");
  });
});
