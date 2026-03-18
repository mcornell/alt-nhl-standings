import { deriveTeamStats, calculateCustomPoints, type TeamStats, type PointValues } from "./standings.ts";
import { renderTeamRow, renderForm, renderTableHeader } from "./render.ts";

function renderTable(teams: TeamStats[], pointValues?: PointValues): string {
  const rows = teams.map((team) => {
    const points = pointValues ? calculateCustomPoints(team, pointValues) : team.points;
    return renderTeamRow({ ...team, points });
  }).join("");
  return `<table>${renderTableHeader()}${rows}</table>`;
}

function readPointValues(form: HTMLFormElement): PointValues {
  const val = (id: string) => Number((form.elements.namedItem(id) as HTMLInputElement).value) || 0;
  return {
    regWin: val("reg-win"),
    otWin: val("ot-win"),
    soWin: val("so-win"),
    otLoss: val("ot-loss"),
    soLoss: val("so-loss"),
    regLoss: val("reg-loss"),
  };
}

async function main() {
  const res = await fetch("https://api-web.nhle.com/v1/standings/now");
  const data = await res.json() as { standings: unknown[] };
  const teams = data.standings.map((raw) => deriveTeamStats(raw as Parameters<typeof deriveTeamStats>[0]));

  const app = document.getElementById("app")!;
  app.innerHTML = renderForm() + renderTable(teams);

  app.querySelector("form")!.addEventListener("submit", (e) => {
    e.preventDefault();
    const pv = readPointValues(e.target as HTMLFormElement);
    app.querySelector("table")!.outerHTML = renderTable(teams, pv);
    app.innerHTML = renderForm() + renderTable(teams, pv);
  });
}

main();
