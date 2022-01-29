export const countryNumberPath = {
  get: {
    tags: ['Countries'],
    summary: 'API to return the number of countries in the world.',
    responses: {
      200: {
        description: 'Successful operation',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/countryNumber'
            }
          }
        }
      }
    }
  }
}
