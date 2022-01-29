import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoadNumberCountriesController } from '../factories/load-number-countries/load-number-countries-factory'
import { makeLoadHolCountryController } from '../factories/load-hol-country/load-hol-country-factory'
import { makeLoadCommonOfficialLanguagesController } from '../factories/load-common-official-languages/load-common-official-languages-factory'
import { makeLoadCountryMostOfficialLanguagesController } from '../factories/load-country-most-official-languages/load-country-most-official-languages-factory'

export default (router: Router): void => {
  router.get('/countries/total', adaptRoute(makeLoadNumberCountriesController()))
  router.get('/countries/official-languages/most', adaptRoute(makeLoadCountryMostOfficialLanguagesController()))
  router.get('/countries/highest/official-languages', adaptRoute(makeLoadHolCountryController()))
  router.get('/countries/common/official-languages', adaptRoute(makeLoadCommonOfficialLanguagesController()))
}
