export type ComparisonMode = "under" | "over";

export type NumberRelation = "higher" | "lower" | "equal";

export interface GameRecord {
  id: number;
  time: string;
  comparison: ComparisonMode;
  threshold: number;
  result: number;
  isWin: boolean;
}
