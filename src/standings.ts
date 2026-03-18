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

export interface TeamStats {
  teamName: string;
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

export interface PointValues {
  regWin: number;
  otWin: number;
  soWin: number;
  otLoss: number;
  soLoss: number;
  regLoss: number;
}

export function deriveTeamStats(raw: RawTeam): TeamStats {
  return {
    teamName: raw.teamName.default,
    gamesPlayed: raw.gamesPlayed,
    wins: raw.wins,
    losses: raw.losses,
    otLosses: raw.otLosses,
    points: raw.points,
    regulationWins: raw.regulationWins,
    regulationPlusOtWins: raw.regulationPlusOtWins,
    shootoutWins: raw.shootoutWins,
    shootoutLosses: raw.shootoutLosses,
  };
}

export function sortByCustomPoints(teams: TeamStats[], pv: PointValues): TeamStats[] {
  return [...teams].sort((a, b) => calculateCustomPoints(b, pv) - calculateCustomPoints(a, pv));
}

export function calculateCustomPoints(team: TeamStats, pv: PointValues): number {
  const otWins = team.regulationPlusOtWins - team.regulationWins;
  const pureOtLosses = team.otLosses - team.shootoutLosses;
  return (
    team.regulationWins * pv.regWin +
    otWins * pv.otWin +
    team.shootoutWins * pv.soWin +
    pureOtLosses * pv.otLoss +
    team.shootoutLosses * pv.soLoss +
    team.losses * pv.regLoss
  );
}
