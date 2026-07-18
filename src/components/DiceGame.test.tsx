import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import DiceGame from "@/components/DiceGame";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("DiceGame", () => {
  it("starts with a clean game state", () => {
    render(<DiceGame />);

    expect(
      screen.getByRole("status", { name: "Latest result" }),
    ).toHaveTextContent("—");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByText("No games yet")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Under" })).toBeChecked();
    expect(screen.getByRole("slider", { name: "Guess threshold" })).toHaveValue(
      "20",
    );
  });

  it("shows a loss and adds it to history", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.999_999);
    const user = userEvent.setup();

    render(<DiceGame />);
    await user.click(screen.getByRole("button", { name: "Play" }));

    expect(
      screen.getByRole("status", { name: "Latest result" }),
    ).toHaveTextContent("100");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "You lostNumber was higher",
    );
    expect(screen.getByText("Under 20")).toBeInTheDocument();
    expect(screen.getByLabelText("100, loss")).toBeInTheDocument();
  });

  it("supports an over prediction", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.999_999);
    const user = userEvent.setup();

    render(<DiceGame />);
    await user.click(screen.getByRole("radio", { name: "Over" }));
    await user.click(screen.getByRole("button", { name: "Play" }));

    expect(screen.getByRole("alert")).toHaveTextContent("You won");
    expect(screen.getByText("Over 20")).toBeInTheDocument();
    expect(screen.getByLabelText("100, win")).toBeInTheDocument();
  });

  it("keeps only the ten latest games", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const user = userEvent.setup();

    render(<DiceGame />);
    const playButton = screen.getByRole("button", { name: "Play" });

    for (let play = 0; play < 11; play += 1) {
      await user.click(playButton);
    }

    const history = screen.getByRole("table", { name: "Game history" });
    expect(within(history).getAllByRole("row")).toHaveLength(11);
  });
});
