import type { Country } from '../types/country'

export function getRegions(countries: Country[]): string[] { return [...new Set(countries.map((country) => country.region))].sort() }
export function getCountriesForRegion(countries: Country[], region: string): Country[] {
  const matching = region === 'All regions' ? countries : countries.filter((country) => country.region === region)
  return [...matching].sort((first, second) => second.population - first.population)
}
export function getTopCountries(countries: Country[], limit: number): Country[] { return countries.slice(0, limit) }
export function formatPopulation(population: number): string { return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(population) }
