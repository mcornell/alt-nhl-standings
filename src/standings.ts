interface RawTeam {
  teamName: { default: string };
  gamesPlayed: number;
  wins: number;
  losses: number;
  otLosses: number;
  points: number;
  regulationWins: number;
  regulationPlusOtWins: number;
  shootoutWins: number;
  shootoutLosses: number;
}

export function deriveTeamStats(raw: RawTeam) {
  return {
    teamName: raw.teamName.default,
    gamesPlayed: raw.gamesPlayed,
    wins: raw.wins,
    losses: raw.losses,
    otLosses: raw.otLosses,
  };
}
