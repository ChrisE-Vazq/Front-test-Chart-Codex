import type { CryptoAsset } from '../types/crypto'

export function getTopAssets(assets: CryptoAsset[], limit: number): CryptoAsset[] {
  return assets.slice(0, limit)
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 }).format(value)
}
