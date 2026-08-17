# Crypto Market Leaders

A small React dashboard that compares cryptocurrency market data in US dollars. Select a market-cap rank range and both charts update with that group of assets.

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

The **Market-cap rank range** dropdown is the interactive control. It changes both charts between ranks 1–10, 11–20, and 21–30. The page includes loading, retryable error, and no-results states so the interface remains understandable when the API is slow or unavailable.

## Limitations

Market values are current and can change between requests. CoinGecko may rate-limit frequent requests, so the application loads 50 assets once and filters them locally when the dropdown changes.
