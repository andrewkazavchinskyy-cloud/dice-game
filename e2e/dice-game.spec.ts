import { expect, test } from "@playwright/test";

test("plays a game and keeps a ten-row history", async ({ page }) => {
  await page.goto("/");

  const result = page.getByRole("status", { name: "Latest result" });
  const slider = page.getByRole("slider", { name: "Guess threshold" });
  const playButton = page.getByRole("button", { name: "Play" });
  const history = page.getByRole("table", { name: "Game history" });

  await expect(result).toHaveText("—");
  await expect(slider).toHaveValue("20");
  await expect(page.getByText("No games yet")).toBeVisible();

  await page.getByRole("radio", { name: "Over" }).check();
  await playButton.click();
  await expect(result).not.toHaveText("—");

  const rolledNumber = Number(await result.textContent());
  expect(Number.isInteger(rolledNumber)).toBe(true);
  expect(rolledNumber).toBeGreaterThanOrEqual(1);
  expect(rolledNumber).toBeLessThanOrEqual(100);
  await expect(page.getByRole("main").getByRole("alert")).toBeVisible();

  for (let play = 0; play < 10; play += 1) {
    await playButton.click();
  }

  await expect(history.getByRole("row")).toHaveCount(11);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
