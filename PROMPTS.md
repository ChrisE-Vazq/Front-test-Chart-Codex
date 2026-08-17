# AI prompt history

This file records meaningful AI-assisted steps during development. Generated suggestions were reviewed and tested by the developer.

## 2026-08-16 — Requirements and plan

**Prompt:** Review the technical exercise requirements and propose a minimal React TypeScript dashboard, including a public API, charts, an interactive control, and a small project structure.

**Result reviewed:** A no-key country data source was selected to support a region filter and population charts. Vite was selected instead of Next.js because this is one client-side page with no server-rendering or routing requirement.

## 2026-08-16 — Implementation and API check

**Prompt:** Implement the approved dashboard incrementally using native fetch, explicit TypeScript types, Chart.js, loading/error states, and a concise README. Verify the selected public API before finalizing.

**Result reviewed:** The original REST Countries v3.1 endpoint returned a deprecation response in live testing, so the implementation was changed to the keyless World Bank Indicators API. Fetching, data transformation, chart rendering, and styles remain in small focused files. Lint and production build are run after implementation.
