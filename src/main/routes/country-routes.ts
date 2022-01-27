import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoadNumberCountriesController } from '../factories/load-number-countries/load-number-countries-factory'
import { makeLoadMolCountryController } from '../factories/load-mol-country/load-mol-country-factory'
import { makeLoadHolCountryController } from '../factories/load-hol-country/load-hol-country-factory'

export default (router: Router): void => {
  router.get('/countries/total', adaptRoute(makeLoadNumberCountriesController()))
  router.get('/countries', adaptRoute(makeLoadMolCountryController()))
  router.get('/countries/highest/official-languages', adaptRoute(makeLoadHolCountryController()))
}
