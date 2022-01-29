import { countryNumberPath } from './paths/countries-number-path'
import { countriesNumberParamSchema } from './schemas/countries-number-params-schema'
import { commonOfficialLanguagesPath } from './paths/common-official-languages-path'
import { countryNumberSchema } from './schemas/country-number-schema'
import { countryHighestNumberOfficialLanguagesSchema } from './schemas/country-highest-number-official-languages-schema'
import { countryHighestNumberOfficialLanguagesPath } from './paths/country-highest-number-official-languages-path'
import { countryMostOfficialLanguagesSchema } from './schemas/country-most-official-languages-schema'
import { countryMostOfficialLanguagesPath } from './paths/country-most-official-languages-path'
import { commonOfficialLanguagesSchema } from './schemas/common-official-languages-schema'

export default {
  openapi: '3.0.0.0',
  info: {
    title: 'Visual Nuts',
    description: 'Countries API',
    version: '1.0.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Countries'
  }],
  paths: {
    '/countries/total': countryNumberPath,
    '/countries/official-languages/{language}/highest': countryMostOfficialLanguagesPath,
    '/countries/official-languages/highest': countryHighestNumberOfficialLanguagesPath,
    '/countries/official-languages/most-common': commonOfficialLanguagesPath
  },
  schemas: {
    countriesNumberParam: countriesNumberParamSchema,
    countryNumber: countryNumberSchema,
    commonOfficialLanguages: commonOfficialLanguagesSchema,
    countryHighestNumberOfficialLanguages: countryHighestNumberOfficialLanguagesSchema,
    countryMostOfficialLanguages: countryMostOfficialLanguagesSchema
  }
}
