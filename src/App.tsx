import { useEffect, useState } from 'react'
import { Dashboard } from './components/Dashboard'
import { fetchCryptoAssets } from './services/cryptoApi'
import type { CryptoAsset } from './types/crypto'
import './App.css'

function App() {
  const [assets, setAssets] = useState<CryptoAsset[]>([])
  const [selectedRankOffset, setSelectedRankOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  async function loadAssets() {
    setIsLoading(true)
    setErrorMessage('')
    try {
      setAssets(await fetchCryptoAssets(50))
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to load market data.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { void loadAssets() }, [])

  return <main className="app-shell">
    <header className="page-header">
      <p className="eyebrow">CoinGecko market dashboard</p>
      <h1>Crypto market leaders</h1>
      <p className="intro">Compare the largest cryptocurrencies by market capitalization in US dollars.</p>
    </header>
    <Dashboard assets={assets} selectedRankOffset={selectedRankOffset} isLoading={isLoading} errorMessage={errorMessage} onRankOffsetChange={setSelectedRankOffset} onRetry={() => void loadAssets()} />
    <footer className="page-footer">Frontend Codex test</footer>
  </main>
}

export default App
