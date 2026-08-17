import { useEffect, useMemo, useState } from 'react'
import { Dashboard } from './components/Dashboard'
import { fetchCountries } from './services/countriesApi'
import type { Country } from './types/country'
import { getRegions } from './utils/countryData'
import './App.css'

function App() {
  const [countries, setCountries] = useState<Country[]>([])
  const [selectedRegion, setSelectedRegion] = useState('All regions')
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  async function loadCountries() {
    setIsLoading(true)
    setErrorMessage('')
    try {
      setCountries(await fetchCountries())
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to load country data.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { void loadCountries() }, [])
  const regions = useMemo(() => getRegions(countries), [countries])

  return <main className="app-shell">
    <header className="page-header">
      <p className="eyebrow">World Bank data dashboard</p>
      <h1>Population by region</h1>
      <p className="intro">Compare the most populous countries using public World Bank data.</p>
    </header>
    <Dashboard countries={countries} regions={regions} selectedRegion={selectedRegion} isLoading={isLoading} errorMessage={errorMessage} onRegionChange={setSelectedRegion} onRetry={() => void loadCountries()} />
  </main>
}

export default App
