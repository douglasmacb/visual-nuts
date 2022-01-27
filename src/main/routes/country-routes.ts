import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoadNumberCountriesController } from '../factories/load-number-countries/load-number-countries-factory'
import { makeLoadMolCountryController } from '../factories/load-mol-country/load-mol-country-factory'

export default (router: Router): void => {
  router.get('/countries/number', adaptRoute(makeLoadNumberCountriesController()))
  router.get('/countries/languages/:language/official', adaptRoute(makeLoadMolCountryController()))
}
