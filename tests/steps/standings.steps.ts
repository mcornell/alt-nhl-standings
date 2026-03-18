import { createBdd } from "playwright-bdd";
import { expect } from "@playwright/test";
import standingsFixture from "../fixtures/standings.json" with { type: "json" };

const { Given, When, Then } = createBdd();

Given("I open the standings page", async ({ page }) => {
  await page.route("**/nhl-api/v1/standings/now", (route) =>
    route.fulfill({ json: standingsFixture })
  );
  await page.goto("/");
});

Then("I see a standings table", async ({ page }) => {
  await expect(page.getByRole("table").first()).toBeVisible();
});

Then("the table contains at least one team name", async ({ page }) => {
  const firstTeamName = page
    .getByRole("table").first()
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

Then("the {string} input is a dropdown with options 0, 1, 2, 3, and 4", async ({ page }, label) => {
  const select = page.getByLabel(label);
  await expect(select).toHaveRole("combobox");
  for (const val of ["0", "1", "2", "3", "4"]) {
    await expect(select.locator(`option[value="${val}"]`)).toBeAttached();
  }
});

Then("the point inputs default to Reg Win=2, OT Win=2, SO Win=2, Reg Loss=0, OT Loss=1, SO Loss=1", async ({ page }) => {
  const defaults: Record<string, string> = {
    "Reg Win": "2", "OT Win": "2", "SO Win": "2",
    "Reg Loss": "0", "OT Loss": "1", "SO Loss": "1",
  };
  for (const [label, value] of Object.entries(defaults)) {
    await expect(page.getByLabel(label)).toHaveValue(value);
  }
});

Then("I see an {string} conference section", async ({ page }, conference) => {
  await expect(page.getByRole("region", { name: conference })).toBeVisible();
});

Then("I see a {string} conference section", async ({ page }, conference) => {
  await expect(page.getByRole("region", { name: conference })).toBeVisible();
});

Then("{string} appears under the {string} division in {string}", async ({ page }, team, division, conference) => {
  const confSection = page.getByRole("region", { name: conference });
  const divSection = confSection.getByRole("region", { name: division });
  await expect(divSection.getByText(team)).toBeVisible();
});

Then("I see a Wild Card section under {string}", async ({ page }, conference) => {
  const confSection = page.getByRole("region", { name: conference });
  await expect(confSection.getByRole("region", { name: "Wild Card" })).toBeVisible();
});

Then("the table has column headers: Team, GP, W, L, OTL, PTS", async ({ page }) => {
  const table = page.getByRole("table").first();
  for (const text of ["Team", "GP", "W", "L", "OTL", "PTS"]) {
    await expect(table.getByRole("columnheader", { name: text, exact: true })).toBeVisible();
  }
});

When("I enter {int} for {string}, {int} for {string}, {int} for {string}, {int} for {string}, {int} for {string}, {int} for {string}", async ({ page }, rw, _l1, otw, _l2, sow, _l3, otl, _l4, sol, _l5, rl, _l6) => {
  await page.getByLabel("Reg Win").selectOption(String(rw));
  await page.getByLabel("OT Win").selectOption(String(otw));
  await page.getByLabel("SO Win").selectOption(String(sow));
  await page.getByLabel("OT Loss").selectOption(String(otl));
  await page.getByLabel("SO Loss").selectOption(String(sol));
  await page.getByLabel("Reg Loss").selectOption(String(rl));
});

When("I click Calculate", async ({ page }) => {
  await page.getByRole("button", { name: "Calculate" }).click();
});

Then("{string} shows custom points of {int}", async ({ page }, teamName, expected) => {
  const row = page.getByTestId("team-name").filter({ hasText: teamName }).locator("xpath=..");
  await expect(row.getByTestId("points")).toHaveText(String(expected));
});

Then("{string} is first in the {string} division", async ({ page }, teamName, division) => {
  const divSection = page.getByRole("region", { name: division });
  const firstRow = divSection.getByRole("table").getByRole("row").nth(1);
  await expect(firstRow.getByTestId("team-name")).toHaveText(teamName);
});

Then("the first row shows the team's games played, wins, losses, OT losses, and points", async ({ page }) => {
  const firstRow = page.getByRole("table").first().getByRole("row").nth(1);
  await expect(firstRow.getByTestId("games-played")).not.toBeEmpty();
  await expect(firstRow.getByTestId("wins")).not.toBeEmpty();
  await expect(firstRow.getByTestId("losses")).not.toBeEmpty();
  await expect(firstRow.getByTestId("ot-losses")).not.toBeEmpty();
  await expect(firstRow.getByTestId("points")).not.toBeEmpty();
});
