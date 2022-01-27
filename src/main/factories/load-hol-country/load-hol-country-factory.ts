import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { CountryMemoryRepository } from '../../../infra/db/memory/country/country-memory-repository'
import { LoadHolCountryController } from '../../../presentation/controllers/country/load-hol-country/load-hol-country-protocols'
import { DbLoadHolCountry } from '../../../data/usecases/db-country/db-load-hol-country/db-load-hol-country'

export const makeLoadHolCountryController = (): Controller => {
  const countryMemoryRepository = new CountryMemoryRepository()
  const dbLoadHolCountry = new DbLoadHolCountry(countryMemoryRepository)
  const loadHolCountryController = new LoadHolCountryController(dbLoadHolCountry)
  return new LogControllerDecorator(loadHolCountryController)
}
