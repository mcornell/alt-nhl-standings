import { describe, it, expect } from "vitest";
import { renderTeamRow } from "./render.ts";

describe("renderTeamRow", () => {
  it("includes the team name in a data-testid='team-name' element", () => {
    const html = renderTeamRow({ teamName: "Colorado Avalanche" });
    expect(html).toContain('data-testid="team-name"');
    expect(html).toContain("Colorado Avalanche");
  });
});
