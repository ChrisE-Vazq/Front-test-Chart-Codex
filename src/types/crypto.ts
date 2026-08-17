export interface CryptoAsset {
  id: string
  name: string
  symbol: string
  marketCap: number
  currentPrice: number
  totalVolume: number
}

export interface CoinGeckoAssetResponse {
  id?: string
  name?: string
  symbol?: string
  market_cap?: number
  current_price?: number
  total_volume?: number
}
