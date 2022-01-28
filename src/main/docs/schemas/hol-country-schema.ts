export const holSchema = {
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
