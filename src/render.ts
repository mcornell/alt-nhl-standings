interface TeamRow {
  teamName: string;
}

export function renderTeamRow(team: TeamRow): string {
  return `<tr><td data-testid="team-name">${team.teamName}</td></tr>`;
}
