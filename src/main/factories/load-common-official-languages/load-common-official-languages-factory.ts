import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { CountryMemoryRepository } from '../../../infra/db/memory/country/country-memory-repository'
import { DbLoadCommonOfficialLanguages } from '../../../data/usecases/db-country/db-load-most-official-languages/db-load-most-official-languages'
import { LoadCommonOfficialLanguagesController } from '../../../presentation/controllers/country/load-common-official-languages/load-common-official-languages-controller'

export const makeLoadCommonOfficialLanguagesController = (): Controller => {
  const countryMemoryRepository = new CountryMemoryRepository()
  const dbLoadCommonOfficialLanguages = new DbLoadCommonOfficialLanguages(countryMemoryRepository)
  const loadNumberCountriesController = new LoadCommonOfficialLanguagesController(dbLoadCommonOfficialLanguages)
  return new LogControllerDecorator(loadNumberCountriesController)
}
