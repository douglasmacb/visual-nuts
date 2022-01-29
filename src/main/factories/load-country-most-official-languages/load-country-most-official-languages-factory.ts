import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { CountryMemoryRepository } from '../../../infra/db/memory/country/country-memory-repository'
import { DbLoadCountryMostOfficialLanguages } from '../../../data/usecases/db-country/db-load-country-most-official-languages/db-load-country-most-official-languages'
import { LoadCountryMostOfficialLanguagesController } from '../../../presentation/controllers/country/load-country-most-official-languages/load-country-most-official-languages-protocols'
import { makeLoadCountryMostOfficialLanguagesValidation } from './load-country-most-official-languages-validation'

export const makeLoadCountryMostOfficialLanguagesController = (): Controller => {
  const countryMemoryRepository = new CountryMemoryRepository()
  const dbLoadCountryMostOfficialLanguages = new DbLoadCountryMostOfficialLanguages(countryMemoryRepository)
  const loadCountryMostOfficialLanguagesController = new LoadCountryMostOfficialLanguagesController(dbLoadCountryMostOfficialLanguages, makeLoadCountryMostOfficialLanguagesValidation())
  return new LogControllerDecorator(loadCountryMostOfficialLanguagesController)
}
