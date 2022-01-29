import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { CountryMemoryRepository } from '../../../infra/db/memory/country/country-memory-repository'
import { LoadCountryHighestNumberOfficialLanguagesController } from '../../../presentation/controllers/country/load-country-highest-number-official-languages/load-country-highest-number-official-languages-protocols'
import { DbLoadCountryHighestNumberOfficialLanguages } from '../../../data/usecases/db-country/db-load-country-highest-number-official-languages/db-load-country-highest-number-official-languages'

export const makeLoadCountryHighestNumberOfficialLanguagesController = (): Controller => {
  const countryMemoryRepository = new CountryMemoryRepository()
  const dbLoadCountryHighestNumberOfficialLanguages = new DbLoadCountryHighestNumberOfficialLanguages(countryMemoryRepository)
  const loadHolCountryController = new LoadCountryHighestNumberOfficialLanguagesController(dbLoadCountryHighestNumberOfficialLanguages)
  return new LogControllerDecorator(loadHolCountryController)
}
