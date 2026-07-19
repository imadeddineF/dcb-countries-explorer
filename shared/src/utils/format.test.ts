import { describe, expect, it } from "vitest";

import { formatPopulation } from "./format";

describe("formatPopulation", () => {
  it("groups thousands for the given locale", () => {
    expect(formatPopulation(41_575_585, "en")).toBe("41,575,585");
  });

  it("handles small numbers without separators", () => {
    expect(formatPopulation(801, "en")).toBe("801");
  });
});
