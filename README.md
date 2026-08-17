# Crypto Market Leaders

A small React dashboard that compares cryptocurrency market data in US dollars. Select how many of the largest assets to load; the charts update using the returned data.

## API

The project uses the [CoinGecko API](https://www.coingecko.com/en/api). Its public market endpoint needs no API key for this exercise and permits browser requests. It provides current cryptocurrency names, market capitalization, price, and volume data.

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

Fetching is isolated in `src/services/cryptoApi.ts`. The service checks HTTP status codes and validates the returned response before creating the smaller `CryptoAsset` shape. `src/utils/cryptoData.ts` contains pure chart helpers.

The **Assets to load** dropdown is the interactive control. It requests the selected number of top assets, then updates both charts. The page includes loading, retryable error, and no-results states so the interface remains understandable when the API is slow or unavailable.

## Limitations

Market values are current and can change between requests. CoinGecko may rate-limit frequent requests, so the application intentionally makes one request when the page loads and another only when the dropdown changes or the user retries.
