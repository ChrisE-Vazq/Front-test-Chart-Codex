# Population by Region

A small React dashboard that compares country population data. Choose a region to update both charts: a bar chart of the ten largest populations and a doughnut chart of the five largest population shares.

## API

The project uses the [World Bank Indicators API](https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation). It is public, requires no API key, and supplies country metadata plus total population values. The dashboard requests the latest selected year (2023) from the `SP.POP.TOTL` population indicator.

## Technologies

- React and TypeScript
- Vite
- Native browser `fetch`
- Chart.js via `react-chartjs-2`

## Run locally

```bash
npm install
npm run dev
```

To create a production build:

```bash
npm run build
```

## Implementation notes

Fetching is isolated in `src/services/countriesApi.ts`. It makes two parallel requests, checks HTTP status codes, and validates the response before returning the smaller `Country` shape. `src/utils/countryData.ts` contains pure filtering, sorting, and formatting helpers used by the dashboard.

The region dropdown is the interactive control. It changes the source countries for both charts. The page has explicit loading, retryable error, and no-results states so it remains understandable when the API is slow or unavailable.

## Limitations

The data is loaded directly from a third-party public API each time the page opens; no caching is included. Population values are the 2023 values currently provided by the API, and chart values depend on its availability.
