export const molSchema = {
  properties: {
    countries: {
      type: 'array',
      items: {
        type: 'object',
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
    },
    languagesCount: {
      type: 'number'
    }
  }
}
