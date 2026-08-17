import { Bar, Doughnut } from 'react-chartjs-2'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js'
import type { CryptoAsset } from '../types/crypto'
import { formatUsd, getTopAssets } from '../utils/cryptoData'
import { ChartCard } from './ChartCard'

ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Tooltip)

interface DashboardProps {
  assets: CryptoAsset[]; selectedLimit: number; isLoading: boolean; errorMessage: string
  onLimitChange: (limit: number) => void; onRetry: () => void
}

const chartColors = ['#276749', '#3182ce', '#805ad5', '#d69e2e', '#dd6b20']

export function Dashboard({ assets, selectedLimit, isLoading, errorMessage, onLimitChange, onRetry }: DashboardProps) {
  if (isLoading) return <section className="status" aria-live="polite"><h2>Loading market data…</h2><p>The charts will appear once the request is complete.</p></section>
  if (errorMessage) return <section className="status error-status" role="alert"><h2>Market data could not be loaded</h2><p>{errorMessage}</p><button className="retry-button" type="button" onClick={onRetry}>Try again</button></section>

  const topTen = getTopAssets(assets, 10)
  const topFive = getTopAssets(assets, 5)
  const barData = { labels: topTen.map((asset) => asset.name), datasets: [{ label: 'Market capitalization (USD)', data: topTen.map((asset) => asset.marketCap), backgroundColor: '#3182ce', borderRadius: 4 }] }
  const doughnutData = { labels: topFive.map((asset) => asset.name), datasets: [{ label: 'Market capitalization (USD)', data: topFive.map((asset) => asset.marketCap), backgroundColor: chartColors.slice(0, topFive.length) }] }

  return <>
    <div className="toolbar">
      <label className="filter-label" htmlFor="asset-count">Assets to load
        <select id="asset-count" value={selectedLimit} onChange={(event) => onLimitChange(Number(event.target.value))}>
          <option value={10}>Top 10</option><option value={25}>Top 25</option><option value={50}>Top 50</option>
        </select>
      </label>
      <p className="summary">{assets.length} assets loaded, ordered by market capitalization.</p>
    </div>
    {assets.length === 0 ? <section className="status empty-state"><h2>No market data available</h2><p>Try loading the data again.</p></section> : <div className="charts">
      <ChartCard title="Largest market caps" description="The 10 largest loaded cryptocurrencies by market capitalization.">
        <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (context) => `Market cap: ${formatUsd(Number(context.parsed.y))}` } } }, scales: { y: { ticks: { callback: (value) => formatUsd(Number(value)) } } } }} />
      </ChartCard>
      <ChartCard title="Top five share" description="Market-cap proportions among the five largest loaded cryptocurrencies.">
        <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false, plugins: { tooltip: { callbacks: { label: (context) => `${context.label}: ${formatUsd(Number(context.parsed))}` } } } }} />
      </ChartCard>
    </div>}
  </>
}
