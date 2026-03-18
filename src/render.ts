interface TeamRow {
  teamName: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  otLosses: number;
  points: number;
}

export function renderTableHeader(): string {
  return `<thead><tr><th scope="col">Team</th><th scope="col">GP</th><th scope="col">W</th><th scope="col">L</th><th scope="col">OTL</th><th scope="col">PTS</th></tr></thead>`;
}

export function renderForm(): string {
  const outcomes = ["Reg Win", "OT Win", "SO Win", "OT Loss", "SO Loss", "Reg Loss"];
  const inputs = outcomes.map((label) => {
    const id = label.toLowerCase().replace(/ /g, "-");
    return `<label for="${id}">${label}</label><input id="${id}" type="number" min="0" max="4" />`;
  }).join("");
  return `<form>${inputs}<button type="submit">Calculate</button></form>`;
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
