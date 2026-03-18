interface TeamRow {
  teamName: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  otLosses: number;
  points: number;
}

export function renderTeamRow(team: TeamRow): string {
  return `<tr>` +
    `<td data-testid="team-name">${team.teamName}</td>` +
    `<td data-testid="games-played">${team.gamesPlayed}</td>` +
    `<td data-testid="wins">${team.wins}</td>` +
    `<td data-testid="losses">${team.losses}</td>` +
    `<td data-testid="ot-losses">${team.otLosses}</td>` +
    `<td data-testid="points">${team.points}</td>` +
    `</tr>`;
}
