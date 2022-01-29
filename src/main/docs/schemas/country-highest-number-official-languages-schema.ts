export const countryHighestNumberOfficialLanguagesSchema = {
  properties: {
    country: {
      type: 'string'
    },
    languages: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
}
