import { deriveTeamStats, calculateCustomPoints, groupStandings, type TeamStats, type PointValues } from "./standings.ts";
import { renderConferenceStandings, renderForm } from "./render.ts";

function getPoints(teams: TeamStats[], pv?: PointValues): (t: TeamStats) => number {
  return pv
    ? (t) => calculateCustomPoints(t, pv)
    : (t) => t.points;
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
  const res = await fetch("/nhl-api/v1/standings/now");
  const data = await res.json() as { standings: unknown[] };
  const teams = data.standings.map((raw) => deriveTeamStats(raw as Parameters<typeof deriveTeamStats>[0]));

  const app = document.getElementById("app")!;
  app.style.display = "flex";
  app.style.alignItems = "flex-start";
  app.style.gap = "2rem";

  const render = (pv?: PointValues) => {
    const pts = getPoints(teams, pv);
    const groups = groupStandings(teams, pts);
    app.innerHTML = renderConferenceStandings(groups, pts) + renderForm();
    app.querySelector("form")!.addEventListener("submit", (e) => {
      e.preventDefault();
      render(readPointValues(e.target as HTMLFormElement));
    });
  };

  render();
}

main();
