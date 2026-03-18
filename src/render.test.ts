import { describe, it, expect } from "vitest";
import { renderTeamRow, renderForm, renderTableHeader } from "./render.ts";

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

describe("renderTableHeader", () => {
  it("renders th elements for Team, GP, W, L, OTL, PTS", () => {
    const html = renderTableHeader();
    for (const label of ["Team", "GP", "W", "L", "OTL", "PTS"]) {
      expect(html).toContain(label);
    }
    expect(html).toContain("<th");
  });
});

describe("renderForm", () => {
  it("renders labeled selects in order: Reg Win, OT Win, SO Win, Reg Loss, OT Loss, SO Loss", () => {
    const html = renderForm();
    const order = ["Reg Win", "OT Win", "SO Win", "Reg Loss", "OT Loss", "SO Loss"];
    const positions = order.map((label) => html.indexOf(label));
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  it("renders selects with options 0 through 4", () => {
    const html = renderForm();
    for (const val of ["0", "1", "2", "3", "4"]) {
      expect(html).toContain(`value="${val}"`);
    }
  });

  it("defaults to Reg Win=2, OT Win=2, SO Win=2, Reg Loss=0, OT Loss=1, SO Loss=1", () => {
    const html = renderForm();
    const defaults = [
      ['id="reg-win"', "2"],
      ['id="ot-win"', "2"],
      ['id="so-win"', "2"],
      ['id="reg-loss"', "0"],
      ['id="ot-loss"', "1"],
      ['id="so-loss"', "1"],
    ];
    for (const [id, value] of defaults) {
      expect(html).toContain(`${id}`);
      const selectStart = html.indexOf(id);
      const selectHtml = html.slice(selectStart, html.indexOf("</select>", selectStart));
      expect(selectHtml).toContain(`value="${value}" selected`);
    }
  });

  it("renders a Calculate button", () => {
    const html = renderForm();
    expect(html).toContain("Calculate");
  });
});
