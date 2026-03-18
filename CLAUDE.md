# Development Approach

## BDD Dual-Loop TDD

Every feature increment starts from a failing **Playwright** (browser) scenario and is driven inward through unit-level red-green-refactor cycles.

### Outer loop (Playwright scenario)

1. **Red** — Write one Playwright test describing the next observable user behavior. Run it. Confirm it fails for the expected reason. Do not proceed until the failure matches intent.
2. **Inner loop** — Repeat until the Playwright test can pass:
   - **Red** — Write the smallest Vitest unit test for the next missing piece the scenario needs. One test at a time. Run it. Confirm it fails.
   - **Green** — Write the **minimum** production code to make that unit test pass. No speculative code. No implementing more than the test demands.
   - **Refactor** — Clean up only covered code. All unit tests must stay green.
3. **Green (scenario)** — Re-run the Playwright test. If still failing, identify the missing piece and return to the inner loop.
4. **Refactor (scenario)** — Refactor across modules if needed. All tests must stay green.
5. Repeat from step 1.

### Discipline rules

- **Never skip red.** If you cannot articulate why a test fails, stop and re-read the requirement.
- **One test at a time.** Never write multiple tests before running them.
- **Minimum code.** Only write production code demanded by the current failing test. Stub everything else.
- **Ask before assuming.** If a design decision is unclear, ask the user before writing code.
- **Commit on every green step** (unit or scenario).
- **Run only the relevant test** after each green step; run the full suite before committing.

## Stack

- **App**: Vanilla TypeScript, bundled with Vite
- **Unit tests**: Vitest
- **Browser/scenario tests**: Playwright
- **Data**: NHL API fetched directly from the browser (`https://api-web.nhle.com`). No proxy.

## Project

Alternative NHL standings SPA. User configures points (0–4) per outcome (reg win, OT win, SO win, OT loss, SO loss, reg loss), submits, and sees standings recalculated and re-ranked.

### NHL API

- Standings endpoint: `GET https://api-web.nhle.com/v1/standings/now`
- Key fields per team: `regulationWins`, `regulationPlusOtWins`, `shootoutWins`, `otLosses`, `shootoutLosses`, `losses`, `points`
- Derived: `otWins = regulationPlusOtWins - regulationWins`, `pureOtLosses = otLosses - shootoutLosses`
