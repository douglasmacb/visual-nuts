export const commonOfficialLanguagesSchema = {
  type: 'object',
  properties: {
    languages: {
      type: 'array',
      items: {
        type: 'object',
        name: {
          type: 'string'
        }
      }
    }
  }
}
