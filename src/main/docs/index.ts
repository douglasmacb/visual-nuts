import { countryPath } from './paths/countries-path'
import { countriesParamSchema } from './schemas/countries-params-schema'
import { commonOfficialLanguagesPath } from './paths/common-official-languages-path'
import { countryNumberSchema } from './schemas/country-number-schema'
import { holSchema } from './schemas/hol-country-schema'
import { holPath } from './paths/hol-country-path'
import { molSchema } from './schemas/mol-scountry-schema'
import { molPath } from './paths/mol-country-path'
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
    '/countries/total': countryPath,
    '/countries?official_language={short_name}': molPath,
    '/countries/highest/official-languages': holPath,
    '/countries/common/official-languages': commonOfficialLanguagesPath
  },
  schemas: {
    countriesParam: countriesParamSchema,
    countryNumber: countryNumberSchema,
    commonOfficialLanguages: commonOfficialLanguagesSchema,
    hol: holSchema,
    mol: molSchema
  }
}
