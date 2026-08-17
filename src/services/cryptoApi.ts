import type { CoinGeckoAssetResponse, CryptoAsset } from '../types/crypto'

function isAssetResponse(value: unknown): value is CoinGeckoAssetResponse {
  return typeof value === 'object' && value !== null
}

export async function fetchCryptoAssets(limit: number): Promise<CryptoAsset[]> {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`The market data request failed (HTTP ${response.status}).`)
  }

  const data: unknown = await response.json()
  if (!Array.isArray(data)) {
    throw new Error('The market data response had an unexpected format.')
  }

  return data
    .filter(isAssetResponse)
    .map((asset) => {
      if (!asset.id || !asset.name || !asset.symbol || typeof asset.market_cap !== 'number' || typeof asset.current_price !== 'number' || typeof asset.total_volume !== 'number') return null
      return { id: asset.id, name: asset.name, symbol: asset.symbol.toUpperCase(), marketCap: asset.market_cap, currentPrice: asset.current_price, totalVolume: asset.total_volume }
    })
    .filter((asset): asset is CryptoAsset => asset !== null)
}
