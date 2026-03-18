import { describe, it, expect } from "vitest";
import { renderTeamRow, renderForm } from "./render.ts";

describe("renderTeamRow", () => {
  it("includes the team name in a data-testid='team-name' element", () => {
    const html = renderTeamRow({ teamName: "Colorado Avalanche", gamesPlayed: 66, wins: 44, losses: 13, otLosses: 9, points: 97 });
    expect(html).toContain('data-testid="team-name"');
    expect(html).toContain("Colorado Avalanche");
  });

  it("includes gamesPlayed, wins, losses, otLosses, and points cells", () => {
    const html = renderTeamRow({
      teamName: "Colorado Avalanche",
      gamesPlayed: 66,
      wins: 44,
      losses: 13,
      otLosses: 9,
      points: 97,
    });
    expect(html).toContain('data-testid="games-played"');
    expect(html).toContain('data-testid="wins"');
    expect(html).toContain('data-testid="losses"');
    expect(html).toContain('data-testid="ot-losses"');
    expect(html).toContain('data-testid="points"');
    expect(html).toContain("66");
    expect(html).toContain("44");
    expect(html).toContain("13");
    expect(html).toContain("9");
    expect(html).toContain("97");
  });
});

describe("renderForm", () => {
  it("renders labeled inputs for all six outcomes", () => {
    const html = renderForm();
    for (const label of ["Reg Win", "OT Win", "SO Win", "OT Loss", "SO Loss", "Reg Loss"]) {
      expect(html).toContain(label);
    }
  });

  it("renders a Calculate button", () => {
    const html = renderForm();
    expect(html).toContain("Calculate");
  });
});
