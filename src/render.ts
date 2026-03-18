import type { ConferenceGroup, TeamStats } from "./standings.ts";

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

const OUTCOMES: { label: string; id: string; defaultVal: number }[] = [
  { label: "Reg Win",  id: "reg-win",  defaultVal: 2 },
  { label: "OT Win",   id: "ot-win",   defaultVal: 2 },
  { label: "SO Win",   id: "so-win",   defaultVal: 2 },
  { label: "Reg Loss", id: "reg-loss", defaultVal: 0 },
  { label: "OT Loss",  id: "ot-loss",  defaultVal: 1 },
  { label: "SO Loss",  id: "so-loss",  defaultVal: 1 },
];

export function renderForm(): string {
  const selects = OUTCOMES.map(({ label, id, defaultVal }) => {
    const options = [4, 3, 2, 1, 0].map((v) =>
      `<option value="${v}"${v === defaultVal ? " selected" : ""}>${v}</option>`
    ).join("");
    return `<label for="${id}">${label}</label><select id="${id}">${options}</select>`;
  }).join("");
  return `<form>${selects}<button type="submit">Calculate</button></form>`;
}

function renderDivisionTable(teams: TeamStats[], points: (t: TeamStats) => number, separator?: number): string {
  const rows = teams.map((team, i) => {
    const row = renderTeamRow({ ...team, points: points(team) });
    return separator !== undefined && i === separator - 1
      ? row + `<tr class="wildcard-cutoff"><td colspan="6"></td></tr>`
      : row;
  }).join("");
  return `<table>${renderTableHeader()}<tbody>${rows}</tbody></table>`;
}

export function renderConferenceStandings(groups: ConferenceGroup[], points: (t: TeamStats) => number): string {
  return groups.map(({ conference, divisions, wildCard }) => {
    const divHtml = divisions.map(({ name, teams }) =>
      `<section aria-label="${name}"><h3>${name}</h3>${renderDivisionTable(teams, points)}</section>`
    ).join("");
    const wcHtml = `<section aria-label="Wild Card"><h3>Wild Card</h3>${renderDivisionTable(wildCard, points, 2)}</section>`;
    return `<section aria-label="${conference}"><h2>${conference}</h2>${divHtml}${wcHtml}</section>`;
  }).join("");
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
