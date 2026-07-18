import { describe, expect, it } from "vitest";

import {
  formatGameTime,
  getNumberRelation,
  isWinningRoll,
  rollDice,
} from "@/lib/game";

describe("rollDice", () => {
  it("returns the lower boundary", () => {
    expect(rollDice(() => 0)).toBe(1);
  });

  it("returns the upper boundary", () => {
    expect(rollDice(() => 0.999_999)).toBe(100);
  });
});

describe("isWinningRoll", () => {
  it("uses a strict under comparison", () => {
    expect(isWinningRoll(19, 20, "under")).toBe(true);
    expect(isWinningRoll(20, 20, "under")).toBe(false);
  });

  it("uses a strict over comparison", () => {
    expect(isWinningRoll(21, 20, "over")).toBe(true);
    expect(isWinningRoll(20, 20, "over")).toBe(false);
  });

  it("handles the impossible edge predictions", () => {
    expect(isWinningRoll(1, 0, "under")).toBe(false);
    expect(isWinningRoll(100, 100, "over")).toBe(false);
  });
});

describe("game labels", () => {
  it("describes the result in relation to the threshold", () => {
    expect(getNumberRelation(21, 20)).toBe("higher");
    expect(getNumberRelation(19, 20)).toBe("lower");
    expect(getNumberRelation(20, 20)).toBe("equal");
  });

  it("formats a 24-hour time", () => {
    expect(formatGameTime(new Date(2026, 6, 18, 9, 8, 7))).toBe("09:08:07");
  });
});
