import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { CountryMemoryRepository } from '../../../infra/db/memory/country/country-memory-repository'
import { DbLoadMolCountry } from '../../../data/usecases/db-country/db-load-mol-country/db-load-mol-country'
import { LoadMolCountryController } from '../../../presentation/controllers/country/load-mol-country/load-mol-country-protocols'

export const makeLoadMolCountryController = (): Controller => {
  const countryMemoryRepository = new CountryMemoryRepository()
  const dbLoadMolCountry = new DbLoadMolCountry(countryMemoryRepository)
  const loadMolCountryController = new LoadMolCountryController(dbLoadMolCountry)
  return new LogControllerDecorator(loadMolCountryController)
}
