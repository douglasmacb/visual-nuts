export const countryMostOfficialLanguagesPath = {
  get: {
    tags: ['Countries'],
    summary: 'API to find the country with the most official languages, where they officially speak a language specified (e.g: German [de]). - that counts all the official languages spoken in the listed countries.',
    parameters: [
      {
        name: 'language',
        in: 'path',
        required: true
      }
    ],
    responses: {
      200: {
        description: 'Successful operation',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/countryMostOfficialLanguages'
            }
          }
        }
      }
    }
  }
}
