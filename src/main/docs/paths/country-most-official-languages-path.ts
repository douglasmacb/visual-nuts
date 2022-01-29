export const molPath = {
  get: {
    tags: ['Countries'],
    summary: 'API to find the country with the most official languages, where they officially speak German (de). - that counts all the official languages spoken in the listed countries.',
    parameters: [
      {
        name: 'short_name',
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
