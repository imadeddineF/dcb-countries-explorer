import { describe, expect, it } from "vitest";

import type { RawCountry } from "../types/country";
import { mapCountries, mapCountry } from "./country";

const raw: RawCountry = {
  names: {
    common: "Algeria",
    official: "People's Democratic Republic of Algeria",
  },
  codes: { alpha_2: "DZ", alpha_3: "DZA" },
  flag: {
    url_png: "https://flags.example/dz.png",
    url_svg: "https://flags.example/dz.svg",
    description: "The flag of Algeria",
  },
  capitals: [{ name: "Algiers", attributes: { primary: true } }],
  region: "Africa",
  subregion: "Northern Africa",
  population: 44_700_000,
  languages: [{ name: "Arabic" }],
};

describe("mapCountry", () => {
  it("normalizes a raw v5 country", () => {
    expect(mapCountry(raw)).toEqual({
      code: "DZA",
      name: "Algeria",
      officialName: "People's Democratic Republic of Algeria",
      flagPng: "https://flags.example/dz.png",
      flagSvg: "https://flags.example/dz.svg",
      flagAlt: "The flag of Algeria",
      capital: "Algiers",
      region: "Africa",
      subregion: "Northern Africa",
      population: 44_700_000,
      languages: ["Arabic"],
    });
  });

  it("picks the primary capital when there are several", () => {
    const multi: RawCountry = {
      ...raw,
      capitals: [
        { name: "Pretoria", attributes: { primary: false } },
        { name: "Cape Town", attributes: { primary: true } },
      ],
    };
    expect(mapCountry(multi).capital).toBe("Cape Town");
  });

  it("tolerates missing optional fields", () => {
    const bare: RawCountry = {
      ...raw,
      capitals: undefined,
      languages: undefined,
      subregion: undefined,
    };
    const mapped = mapCountry(bare);
    expect(mapped.capital).toBeUndefined();
    expect(mapped.subregion).toBeUndefined();
    expect(mapped.languages).toEqual([]);
  });
});

describe("mapCountries", () => {
  it("sorts by common name", () => {
    const zimbabwe: RawCountry = {
      ...raw,
      names: { ...raw.names, common: "Zimbabwe" },
    };
    expect(mapCountries([zimbabwe, raw]).map((c) => c.name)).toEqual([
      "Algeria",
      "Zimbabwe",
    ]);
  });
});
