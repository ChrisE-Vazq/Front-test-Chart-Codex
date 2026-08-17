import { Bar, Doughnut } from 'react-chartjs-2'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js'
import type { Country } from '../types/country'
import { formatPopulation, getCountriesForRegion, getTopCountries } from '../utils/countryData'
import { ChartCard } from './ChartCard'

ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Tooltip)

interface DashboardProps {
  countries: Country[]
  regions: string[]
  selectedRegion: string
  isLoading: boolean
  errorMessage: string
  onRegionChange: (region: string) => void
  onRetry: () => void
}

const chartColors = ['#276749', '#3182ce', '#805ad5', '#d69e2e', '#dd6b20']

export function Dashboard({ countries, regions, selectedRegion, isLoading, errorMessage, onRegionChange, onRetry }: DashboardProps) {
  if (isLoading) return <section className="status" aria-live="polite"><h2>Loading country data…</h2><p>The charts will appear once the request is complete.</p></section>
  if (errorMessage) return <section className="status error-status" role="alert"><h2>Country data could not be loaded</h2><p>{errorMessage}</p><button className="retry-button" type="button" onClick={onRetry}>Try again</button></section>

  const countriesInRegion = getCountriesForRegion(countries, selectedRegion)
  const topTen = getTopCountries(countriesInRegion, 10)
  const topFive = getTopCountries(countriesInRegion, 5)
  const barData = { labels: topTen.map((country) => country.name), datasets: [{ label: 'Population', data: topTen.map((country) => country.population), backgroundColor: '#3182ce', borderRadius: 4 }] }
  const doughnutData = { labels: topFive.map((country) => country.name), datasets: [{ label: 'Population', data: topFive.map((country) => country.population), backgroundColor: chartColors.slice(0, topFive.length) }] }

  return <>
    <div className="toolbar">
      <label className="filter-label" htmlFor="region">Region
        <select id="region" value={selectedRegion} onChange={(event) => onRegionChange(event.target.value)}>
          <option>All regions</option>
          {regions.map((region) => <option key={region}>{region}</option>)}
        </select>
      </label>
      <p className="summary">{countriesInRegion.length} countries shown for {selectedRegion.toLowerCase()}.</p>
    </div>
    {countriesInRegion.length === 0 ? <section className="status empty-state"><h2>No countries available</h2><p>Try choosing another region.</p></section> : <div className="charts">
      <ChartCard title="Largest populations" description="The 10 most populous countries in the selected region.">
        <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (context) => `Population: ${formatPopulation(Number(context.parsed.y))}` } } }, scales: { y: { ticks: { callback: (value) => formatPopulation(Number(value)) } } } }} />
      </ChartCard>
      <ChartCard title="Top five share" description="Population proportions among the five largest countries shown.">
        <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false, plugins: { tooltip: { callbacks: { label: (context) => `${context.label}: ${formatPopulation(Number(context.parsed))}` } } } }} />
      </ChartCard>
    </div>}
  </>
}
