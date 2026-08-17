import { Bar, Doughnut } from 'react-chartjs-2'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js'
import type { CryptoAsset } from '../types/crypto'
import { formatUsd, getTopAssets } from '../utils/cryptoData'
import { ChartCard } from './ChartCard'

ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Tooltip)

interface DashboardProps {
  assets: CryptoAsset[]; selectedRankOffset: number; isLoading: boolean; errorMessage: string
  onRankOffsetChange: (offset: number) => void; onRetry: () => void
}

const chartColors = ['#276749', '#3182ce', '#805ad5', '#d69e2e', '#dd6b20']

export function Dashboard({ assets, selectedRankOffset, isLoading, errorMessage, onRankOffsetChange, onRetry }: DashboardProps) {
  if (isLoading) return <section className="status" aria-live="polite"><h2>Loading market data…</h2><p>The charts will appear once the request is complete.</p></section>
  if (errorMessage) return <section className="status error-status" role="alert"><h2>Market data could not be loaded</h2><p>{errorMessage}</p><button className="retry-button" type="button" onClick={onRetry}>Try again</button></section>

  const selectedAssets = assets.slice(selectedRankOffset, selectedRankOffset + 10)
  const topTen = getTopAssets(selectedAssets, 10)
  const topFive = getTopAssets(selectedAssets, 5)
  const firstRank = selectedRankOffset + 1
  const lastRank = selectedRankOffset + selectedAssets.length
  const barData = { labels: topTen.map((asset) => asset.name), datasets: [{ label: 'Market capitalization (USD)', data: topTen.map((asset) => asset.marketCap), backgroundColor: '#3182ce', borderRadius: 4 }] }
  const doughnutData = { labels: topFive.map((asset) => asset.name), datasets: [{ label: 'Market capitalization (USD)', data: topFive.map((asset) => asset.marketCap), backgroundColor: chartColors.slice(0, topFive.length) }] }

  return <>
    <div className="toolbar">
      <label className="filter-label" htmlFor="rank-range">Market-cap rank range
        <select id="rank-range" value={selectedRankOffset} onChange={(event) => onRankOffsetChange(Number(event.target.value))}>
          <option value={0}>Ranks 1–10</option><option value={10}>Ranks 11–20</option><option value={20}>Ranks 21–30</option>
        </select>
      </label>
      <p className="summary">Showing ranks {firstRank}–{lastRank} of {assets.length} loaded assets.</p>
    </div>
    {assets.length === 0 ? <section className="status empty-state"><h2>No market data available</h2><p>Try loading the data again.</p></section> : <div className="charts">
      <ChartCard title="Market capitalization" description={`Cryptocurrencies ranked ${firstRank} to ${lastRank} by market capitalization.`}>
        <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (context) => `Market cap: ${formatUsd(Number(context.parsed.y))}` } } }, scales: { y: { ticks: { callback: (value) => formatUsd(Number(value)) } } } }} />
      </ChartCard>
      <ChartCard title="First five share" description={`Market-cap proportions for the first five assets in ranks ${firstRank} to ${lastRank}.`}>
        <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false, plugins: { tooltip: { callbacks: { label: (context) => `${context.label}: ${formatUsd(Number(context.parsed))}` } } } }} />
      </ChartCard>
    </div>}
  </>
}
