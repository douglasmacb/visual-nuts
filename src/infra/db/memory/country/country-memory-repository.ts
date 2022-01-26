import { LoadCountriesRepository } from '../../../../data/protocols/db/load-countries-repository'
import { CountryModel } from '../../../../domain/models/country-model'

export class CountryMemoryRepository implements LoadCountriesRepository {
  async loadAll (): Promise<CountryModel[]> {
    const countries: CountryModel[] = [
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
    return Promise.resolve(countries)
  }
}
