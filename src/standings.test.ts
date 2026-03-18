import { describe, it, expect } from "vitest";
import { deriveTeamStats } from "./standings.ts";

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
