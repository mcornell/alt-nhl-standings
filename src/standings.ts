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
  conferenceName: string;
  divisionName: string;
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
  conferenceName: string;
  divisionName: string;
}

export interface PointValues {
  regWin: number;
  otWin: number;
  soWin: number;
  otLoss: number;
  soLoss: number;
  regLoss: number;
}

export interface DivisionGroup {
  name: string;
  teams: TeamStats[];
}

export interface ConferenceGroup {
  conference: string;
  divisions: DivisionGroup[];
  wildCard: TeamStats[];
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
    conferenceName: raw.conferenceName,
    divisionName: raw.divisionName,
  };
}

export function groupStandings(teams: TeamStats[]): ConferenceGroup[] {
  const conferences = [...new Set(teams.map((t) => t.conferenceName))].sort();
  return conferences.map((conf) => {
    const confTeams = teams.filter((t) => t.conferenceName === conf);
    const divisionNames = [...new Set(confTeams.map((t) => t.divisionName))].sort();
    const wildCard: TeamStats[] = [];
    const divisions: DivisionGroup[] = divisionNames.map((div) => {
      const divTeams = confTeams
        .filter((t) => t.divisionName === div)
        .sort((a, b) => b.points - a.points);
      const top3 = divTeams.slice(0, 3);
      wildCard.push(...divTeams.slice(3));
      return { name: div, teams: top3 };
    });
    wildCard.sort((a, b) => b.points - a.points);
    return { conference: conf, divisions, wildCard };
  });
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
