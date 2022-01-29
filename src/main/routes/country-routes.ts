import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoadNumberCountriesController } from '../factories/load-number-countries/load-number-countries-factory'
import { makeLoadCountryHighestNumberOfficialLanguagesController } from '../factories/load-country-highest-number-official-languages/load-country-highest-number-official-languages-factory'
import { makeLoadCommonOfficialLanguagesController } from '../factories/load-common-official-languages/load-common-official-languages-factory'
import { makeLoadCountryMostOfficialLanguagesController } from '../factories/load-country-most-official-languages/load-country-most-official-languages-factory'

export default (router: Router): void => {
  router.get('/countries/total', adaptRoute(makeLoadNumberCountriesController()))
  router.get('/countries/official-languages/most', adaptRoute(makeLoadCountryMostOfficialLanguagesController()))
  router.get('/countries/official-languages/highest', adaptRoute(makeLoadCountryHighestNumberOfficialLanguagesController()))
  router.get('/countries/official-languages/most-common', adaptRoute(makeLoadCommonOfficialLanguagesController()))
}
