import { describe, it, expect } from "vitest";
import { deriveTeamStats, calculateCustomPoints, sortByCustomPoints } from "./standings.ts";

describe("deriveTeamStats", () => {
  it("extracts team name from raw API data", () => {
    const raw = {
      teamName: { default: "Colorado Avalanche" },
      teamAbbrev: { default: "COL" },
      teamLogo: "",
      teamCommonName: { default: "Avalanche" },
      gamesPlayed: 66,
      wins: 44,
      losses: 13,
      otLosses: 9,
      points: 97,
      regulationWins: 39,
      regulationPlusOtWins: 41,
      shootoutWins: 3,
      shootoutLosses: 5,
      divisionName: "Central",
      divisionAbbrev: "C",
      conferenceName: "Western",
      conferenceAbbrev: "W",
      leagueSequence: 1,
      conferenceSequence: 1,
      divisionSequence: 1,
      streakCode: "L",
      streakCount: 2,
      goalFor: 249,
      goalAgainst: 170,
      goalDifferential: 79,
      pointPctg: 0.734848,
    };

    expect(deriveTeamStats(raw).teamName).toBe("Colorado Avalanche");
  });

  it("extracts gamesPlayed from raw API data", () => {
    const raw = {
      teamName: { default: "Colorado Avalanche" },
      gamesPlayed: 66,
      wins: 44,
      losses: 13,
      otLosses: 9,
      points: 97,
      regulationWins: 39,
      regulationPlusOtWins: 41,
      shootoutWins: 3,
      shootoutLosses: 5,
    };

    expect(deriveTeamStats(raw).gamesPlayed).toBe(66);
  });

  it("extracts wins from raw API data", () => {
    const raw = {
      teamName: { default: "Colorado Avalanche" },
      gamesPlayed: 66,
      wins: 44,
      losses: 13,
      otLosses: 9,
      points: 97,
      regulationWins: 39,
      regulationPlusOtWins: 41,
      shootoutWins: 3,
      shootoutLosses: 5,
    };

    expect(deriveTeamStats(raw).wins).toBe(44);
  });

  it("extracts losses from raw API data", () => {
    const raw = {
      teamName: { default: "Colorado Avalanche" },
      gamesPlayed: 66,
      wins: 44,
      losses: 13,
      otLosses: 9,
      points: 97,
      regulationWins: 39,
      regulationPlusOtWins: 41,
      shootoutWins: 3,
      shootoutLosses: 5,
    };

    expect(deriveTeamStats(raw).losses).toBe(13);
  });

  it("extracts otLosses from raw API data", () => {
    const raw = {
      teamName: { default: "Colorado Avalanche" },
      gamesPlayed: 66,
      wins: 44,
      losses: 13,
      otLosses: 9,
      points: 97,
      regulationWins: 39,
      regulationPlusOtWins: 41,
      shootoutWins: 3,
      shootoutLosses: 5,
    };

    expect(deriveTeamStats(raw).otLosses).toBe(9);
  });

  it("extracts points from raw API data", () => {
    const raw = {
      teamName: { default: "Colorado Avalanche" },
      gamesPlayed: 66,
      wins: 44,
      losses: 13,
      otLosses: 9,
      points: 97,
      regulationWins: 39,
      regulationPlusOtWins: 41,
      shootoutWins: 3,
      shootoutLosses: 5,
    };

    expect(deriveTeamStats(raw).points).toBe(97);
  });
});

describe("calculateCustomPoints", () => {
  it("computes points from custom per-outcome values", () => {
    const team = {
      teamName: "Colorado Avalanche",
      gamesPlayed: 66,
      wins: 44,
      losses: 13,
      otLosses: 9,
      points: 97,
      regulationWins: 39,
      regulationPlusOtWins: 41,
      shootoutWins: 3,
      shootoutLosses: 5,
    };
    const pointValues = { regWin: 3, otWin: 2, soWin: 1, otLoss: 1, soLoss: 0, regLoss: 0 };
    // 39*3 + 2*2 + 3*1 + 4*1 + 5*0 + 13*0 = 117 + 4 + 3 + 4 = 128
    expect(calculateCustomPoints(team, pointValues)).toBe(128);
  });
});

describe("sortByCustomPoints", () => {
  it("returns teams sorted descending by custom points", () => {
    const base = { gamesPlayed: 66, wins: 44, losses: 13, otLosses: 9, points: 97, regulationPlusOtWins: 41, shootoutWins: 3, shootoutLosses: 5 };
    const teamA = { ...base, teamName: "Team A", regulationWins: 39 }; // 39*2=78
    const teamB = { ...base, teamName: "Team B", regulationWins: 20 }; // 20*2=40
    const teamC = { ...base, teamName: "Team C", regulationWins: 30 }; // 30*2=60
    const pv = { regWin: 2, otWin: 0, soWin: 0, otLoss: 0, soLoss: 0, regLoss: 0 };
    const sorted = sortByCustomPoints([teamA, teamB, teamC], pv);
    expect(sorted.map((t) => t.teamName)).toEqual(["Team A", "Team C", "Team B"]);
  });
});
