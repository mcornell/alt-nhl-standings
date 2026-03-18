interface RawTeam {
  teamName: { default: string };
}

export function deriveTeamStats(raw: RawTeam) {
  return {
    teamName: raw.teamName.default,
  };
}
