import { createBdd } from "playwright-bdd";
import { expect } from "@playwright/test";

const { Given, Then } = createBdd();

Given("I open the standings page", async ({ page }) => {
  await page.goto("/");
});

Then("I see a standings table", async ({ page }) => {
  await expect(page.getByRole("table")).toBeVisible();
});

Then("the table contains at least one team name", async ({ page }) => {
  const firstTeamName = page
    .getByRole("table")
    .getByRole("row")
    .nth(1)
    .getByTestId("team-name");
  await expect(firstTeamName).not.toBeEmpty();
});
