export interface Country { code: string; name: string; region: string; population: number }

export interface WorldBankCountryApiResponse {
  id?: string
  name?: string
  region?: { id?: string; value?: string }
}

export interface WorldBankPopulationApiResponse {
  countryiso3code?: string
  value?: number | null
}
