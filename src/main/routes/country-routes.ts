import { Router } from 'express'
import { makeLoadNumberCountriesController } from '../factories/load-number-countries/load-number-countries'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.get('/countries/number', adaptRoute(makeLoadNumberCountriesController()))
}
