import { LoadCountriesByLanguageRepository } from '../../../../data/protocols/db-country/load-countries-by-language'
import { LoadCountriesRepository } from '../../../../data/protocols/db-country/load-countries-repository'
import { CountryModel } from '../../../../domain/models/country'

const data: CountryModel[] = [
  {
    country: 'US',
    languages: ['en']
  },
  {
    country: 'BE',
    languages: ['nl', 'fr', 'de']
  },
  {
    country: 'NL',
    languages: ['nl']
  },
  {
    country: 'DE',
    languages: ['de']
  },
  {
    country: 'ES',
    languages: ['es']
  }
]

export class CountryMemoryRepository implements LoadCountriesRepository, LoadCountriesByLanguageRepository {
  async loadAll (): Promise<CountryModel[]> {
    return Promise.resolve(data)
  }

  async loadByLanguage (language: string): Promise<CountryModel[]> {
    const countries = data.filter(country => country.languages.includes(language))
    return Promise.resolve(countries)
  }
}
