# Alt NHL Standings

A vanilla TypeScript + Vite SPA that lets you recalculate and re-rank NHL standings using custom point values per outcome (reg win, OT win, SO win, OT loss, SO loss, reg loss).

## Features

- Configure 0–4 points per outcome
- Standings grouped by conference, division, and wild card (NHL playoff format)
- Wild card cutoff line after the 2nd wild card position
- Live NHL data via the public NHL API

## Development

```bash
npm install
npm run dev        # start dev server (proxies NHL API to avoid CORS)
npm test           # unit tests (Vitest)
npm run test:e2e   # BDD scenario tests (Playwright)
npm run build      # production build
```

## NHL API

Data is fetched from the public NHL API (`api-web.nhle.com`). Thanks to [Zmalski/NHL-API-Reference](https://github.com/Zmalski/NHL-API-Reference) for the unofficial documentation of these endpoints.
