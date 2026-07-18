import type { ComparisonMode, NumberRelation } from "@/types/game";

export const MIN_ROLL = 1;
export const MAX_ROLL = 100;
export const MAX_HISTORY = 10;

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/**
 * Returns a random whole number between 1 and 100.
 */
export function rollDice(random: () => number = Math.random): number {
  return Math.floor(random() * MAX_ROLL) + MIN_ROLL;
}

/**
 * Checks a roll against the selected strict comparison.
 */
export function isWinningRoll(
  result: number,
  threshold: number,
  comparison: ComparisonMode,
): boolean {
  return comparison === "under"
    ? result < threshold
    : result > threshold;
}

/**
 * Describes where the result sits in relation to the chosen threshold.
 */
export function getNumberRelation(
  result: number,
  threshold: number,
): NumberRelation {
  if (result > threshold) {
    return "higher";
  }

  if (result < threshold) {
    return "lower";
  }

  return "equal";
}

/**
 * Formats a play time in the same 24-hour format used in the design.
 */
export function formatGameTime(date: Date = new Date()): string {
  return timeFormatter.format(date);
}
