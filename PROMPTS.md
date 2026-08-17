# AI prompt history

This file records meaningful AI-assisted steps during development. Generated suggestions were reviewed and tested by the developer.

## 2026-08-16 — Requirements and plan

**Prompt:** Review the technical exercise requirements and propose a minimal React TypeScript dashboard, including a public API, charts, an interactive control, and a small project structure.

**Result reviewed:** Vite was selected instead of Next.js because this is one client-side page with no server-rendering or routing requirement.

## 2026-08-16 — Implementation and API review

**Prompt:** Implement the approved dashboard incrementally using native fetch, explicit TypeScript types, Chart.js, loading/error states, and a concise README. Verify that the selected public API works from a browser.

**Result reviewed:** REST Countries v3.1 returned a deprecation response. The World Bank API allowed server-side requests but failed browser CORS checks. The application was changed to CoinGecko after verifying its market endpoint allows cross-origin browser requests. Fetching, transformations, chart rendering, and styles remain in small focused files. Lint and production builds are run after changes.
