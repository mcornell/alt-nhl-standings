import { createBdd } from "playwright-bdd";
import { expect } from "@playwright/test";
import standingsFixture from "../fixtures/standings.json" with { type: "json" };

const { Given, Then } = createBdd();

Given("I open the standings page", async ({ page }) => {
  await page.route("https://api-web.nhle.com/v1/standings/now", (route) =>
    route.fulfill({ json: standingsFixture })
  );
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

Then("I see a form with inputs for Reg Win, OT Win, SO Win, OT Loss, SO Loss, and Reg Loss", async ({ page }) => {
  for (const label of ["Reg Win", "OT Win", "SO Win", "OT Loss", "SO Loss", "Reg Loss"]) {
    await expect(page.getByLabel(label)).toBeVisible();
  }
});

Then("the form has a Calculate button", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Calculate" })).toBeVisible();
});

Then("the first row shows the team's games played, wins, losses, OT losses, and points", async ({ page }) => {
  const firstRow = page.getByRole("table").getByRole("row").nth(1);
  await expect(firstRow.getByTestId("games-played")).not.toBeEmpty();
  await expect(firstRow.getByTestId("wins")).not.toBeEmpty();
  await expect(firstRow.getByTestId("losses")).not.toBeEmpty();
  await expect(firstRow.getByTestId("ot-losses")).not.toBeEmpty();
  await expect(firstRow.getByTestId("points")).not.toBeEmpty();
});
