import type { Country, WorldBankCountryApiResponse, WorldBankPopulationApiResponse } from '../types/country'

const COUNTRIES_URL = 'https://api.worldbank.org/v2/country?format=json&per_page=400'
const POPULATION_URL = 'https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&per_page=400&date=2023'

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isCountryRecord(value: unknown): value is WorldBankCountryApiResponse {
  return isObject(value)
}

function isPopulationRecord(value: unknown): value is WorldBankPopulationApiResponse {
  return isObject(value)
}

function getRecords(response: unknown): unknown[] {
  if (!Array.isArray(response) || !Array.isArray(response[1])) {
    throw new Error('The World Bank response had an unexpected format.')
  }
  return response[1]
}

export async function fetchCountries(): Promise<Country[]> {
  const [countriesResponse, populationResponse] = await Promise.all([
    fetch(COUNTRIES_URL),
    fetch(POPULATION_URL),
  ])

  if (!countriesResponse.ok || !populationResponse.ok) {
    throw new Error('The World Bank data request failed. Please try again.')
  }

  const [countriesData, populationData]: unknown[] = await Promise.all([
    countriesResponse.json(),
    populationResponse.json(),
  ])
  const populations = new Map<string, number>()
  for (const record of getRecords(populationData).filter(isPopulationRecord)) {
    if (typeof record.countryiso3code === 'string' && typeof record.value === 'number') {
      populations.set(record.countryiso3code, record.value)
    }
  }

  return getRecords(countriesData)
    .filter(isCountryRecord)
    .filter((record) => record.region?.id !== 'NA')
    .map((record) => {
      const population = record.id ? populations.get(record.id) : undefined
      if (!record.id || !record.name || !record.region?.value || population === undefined) return null
      return { code: record.id, name: record.name, region: record.region.value.trim(), population }
    })
    .filter((country): country is Country => country !== null)
}
