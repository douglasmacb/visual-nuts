import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { LoadNumberCountriesController } from '../../../presentation/controllers/country/load-number-countries/load-number-countries-controller'
import { DbLoadNumberCountries } from '../../../data/usecases/db-country/db-load-number-countries/db-load-number-countries'
import { CountryMemoryRepository } from '../../../infra/db/memory/country/country-memory-repository'

export const makeLoadNumberCountriesController = (): Controller => {
  const countryMemoryRepository = new CountryMemoryRepository()
  const dbLoadNumberCountries = new DbLoadNumberCountries(countryMemoryRepository)
  const loadNumberCountriesController = new LoadNumberCountriesController(dbLoadNumberCountries)
  return new LogControllerDecorator(loadNumberCountriesController)
}
