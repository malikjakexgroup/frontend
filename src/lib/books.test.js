import { describe, it, expect } from "vitest";
import { authorLine, starCount } from "./books";

describe("authorLine", () => {
  it("joins multiple authors", () => {
    expect(authorLine({ authors: ["James Clear", "John Doe"] })).toBe("James Clear, John Doe");
  });
  it("falls back when there are no authors", () => {
    expect(authorLine({})).toBe("Unknown author");
    expect(authorLine({ authors: [] })).toBe("Unknown author");
  });
});

describe("starCount", () => {
  it("rounds to the nearest whole star", () => {
    expect(starCount(4.5)).toBe(5);
    expect(starCount(4.2)).toBe(4);
  });
  it("clamps and handles missing ratings", () => {
    expect(starCount(null)).toBe(0);
    expect(starCount(9)).toBe(5);
  });
});
