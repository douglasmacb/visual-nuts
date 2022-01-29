export const countryHighestNumberOfficialLanguagesPath = {
  get: {
    tags: ['Countries'],
    summary: 'API to find the country with the highest number of official languages.',
    responses: {
      200: {
        description: 'Successful operation',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/countryHighestNumberOfficialLanguages'
            }
          }
        }
      }
    }
  }
}
