"use client";

import { useRef, useState } from "react";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import GameHistory from "@/components/GameHistory";
import {
  formatGameTime,
  getNumberRelation,
  isWinningRoll,
  MAX_HISTORY,
  rollDice,
} from "@/lib/game";
import type { ComparisonMode, GameRecord } from "@/types/game";

const sliderMarks = [
  { value: 0, label: "0" },
  { value: 20 },
  { value: 40 },
  { value: 60 },
  { value: 80 },
  { value: 100, label: "100" },
];

/**
 * Interactive dice game shown on the home page.
 */
export default function DiceGame() {
  const [comparison, setComparison] = useState<ComparisonMode>("under");
  const [threshold, setThreshold] = useState(20);
  const [lastGame, setLastGame] = useState<GameRecord | null>(null);
  const [history, setHistory] = useState<GameRecord[]>([]);
  const nextGameId = useRef(0);

  const handleComparisonChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    if (value === "under" || value === "over") {
      setComparison(value);
    }
  };

  const handleThresholdChange = (
    _event: Event,
    value: number | number[],
  ) => {
    if (typeof value === "number") {
      setThreshold(value);
    }
  };

  const handlePlay = () => {
    const result = rollDice();
    const game: GameRecord = {
      id: ++nextGameId.current,
      time: formatGameTime(),
      comparison,
      threshold,
      result,
      isWin: isWinningRoll(result, threshold, comparison),
    };

    setLastGame(game);
    setHistory((currentHistory) =>
      [game, ...currentHistory].slice(0, MAX_HISTORY),
    );
  };

  const relation = lastGame
    ? getNumberRelation(lastGame.result, lastGame.threshold)
    : null;

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100dvh",
        bgcolor: "background.default",
        px: 2,
        py: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 600, mx: "auto" }}>
        <Box sx={{ minHeight: 76 }}>
          {lastGame && relation ? (
            <Alert
              severity={lastGame.isWin ? "success" : "error"}
              variant="filled"
              sx={{ width: "100%", minHeight: 76, alignItems: "flex-start" }}
            >
              <AlertTitle>
                {lastGame.isWin ? "You won" : "You lost"}
              </AlertTitle>
              Number was {relation}
            </Alert>
          ) : null}
        </Box>

        <Box
          sx={{
            width: "100%",
            maxWidth: 320,
            mx: "auto",
            mt: 2.75,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.paper",
            }}
          >
            <Typography
              component="output"
              aria-label="Latest result"
              aria-live="polite"
              sx={{
                fontSize: { xs: "5rem", sm: "6rem" },
                fontWeight: 300,
                lineHeight: 1,
                letterSpacing: "-0.01562em",
              }}
            >
              {lastGame?.result ?? "—"}
            </Typography>
          </Paper>

          <RadioGroup
            row
            aria-label="Prediction"
            name="prediction"
            value={comparison}
            onChange={handleComparisonChange}
            sx={{ justifyContent: "center", gap: 1.5, mt: 1.5 }}
          >
            <FormControlLabel
              value="under"
              control={<Radio size="small" />}
              label="Under"
              labelPlacement="start"
              sx={{ m: 0 }}
            />
            <FormControlLabel
              value="over"
              control={<Radio size="small" />}
              label="Over"
              labelPlacement="start"
              sx={{ m: 0 }}
            />
          </RadioGroup>

          <Slider
            aria-label="Guess threshold"
            value={threshold}
            onChange={handleThresholdChange}
            min={0}
            max={100}
            step={1}
            marks={sliderMarks}
            valueLabelDisplay="on"
            sx={{
              height: 2,
              py: "14px",
              mt: 5.25,
              mb: 4.25,
              "& .MuiSlider-thumb": {
                width: 12,
                height: 12,
              },
              "& .MuiSlider-track": {
                border: 0,
              },
              "& .MuiSlider-rail": {
                opacity: 0.38,
              },
              "& .MuiSlider-markLabel": {
                fontSize: "0.75rem",
                top: 41,
              },
              "& .MuiSlider-valueLabel": {
                bgcolor: "grey.600",
                borderRadius: "2px",
                px: 1.5,
                py: 0.5,
                fontSize: "0.875rem",
                fontWeight: 500,
              },
            }}
          />

          <Button
            type="button"
            variant="contained"
            fullWidth
            onClick={handlePlay}
            sx={{ height: 42 }}
          >
            Play
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <GameHistory games={history} />
        </Box>
      </Box>
    </Box>
  );
}
