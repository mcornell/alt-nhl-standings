import { deriveTeamStats } from "./standings.ts";
import { renderTeamRow } from "./render.ts";

async function main() {
  const res = await fetch("https://api-web.nhle.com/v1/standings/now");
  const data = await res.json() as { standings: unknown[] };

  const rows = data.standings
    .map((raw) => deriveTeamStats(raw as Parameters<typeof deriveTeamStats>[0]))
    .map(renderTeamRow)
    .join("");

  document.getElementById("app")!.innerHTML = `<table>${rows}</table>`;
}

main();
