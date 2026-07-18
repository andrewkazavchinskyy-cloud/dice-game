import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import type { GameRecord } from "@/types/game";

interface GameHistoryProps {
  games: GameRecord[];
}

const cellStyles = {
  px: 2,
  py: 0,
  fontSize: "0.875rem",
  lineHeight: "20px",
};

/**
 * Displays the ten most recent games, newest first.
 */
export default function GameHistory({ games }: GameHistoryProps) {
  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Table
        size="small"
        aria-label="Game history"
        sx={{ minWidth: 300, tableLayout: "fixed" }}
      >
        <TableHead>
          <TableRow sx={{ height: 56 }}>
            <TableCell sx={{ ...cellStyles, width: "33.33%", fontWeight: 500 }}>
              Time
            </TableCell>
            <TableCell sx={{ ...cellStyles, width: "33.33%", fontWeight: 500 }}>
              Guess
            </TableCell>
            <TableCell sx={{ ...cellStyles, width: "33.33%", fontWeight: 500 }}>
              Result
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                align="center"
                sx={{ ...cellStyles, color: "text.secondary", py: 1.5 }}
              >
                No games yet
              </TableCell>
            </TableRow>
          ) : (
            games.map((game) => (
              <TableRow key={game.id} sx={{ height: 32 }}>
                <TableCell sx={cellStyles}>{game.time}</TableCell>
                <TableCell sx={cellStyles}>
                  {game.comparison === "under" ? "Under" : "Over"}{" "}
                  {game.threshold}
                </TableCell>
                <TableCell
                  aria-label={`${game.result}, ${game.isWin ? "win" : "loss"}`}
                  sx={{
                    ...cellStyles,
                    color: game.isWin ? "success.main" : "error.main",
                  }}
                >
                  {game.result}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Box>
  );
}
