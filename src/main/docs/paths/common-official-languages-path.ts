export const commonOfficialLanguagesPath = {
  get: {
    tags: ['Countries'],
    summary: 'API to find the most common official language(s), of all countries.',
    responses: {
      200: {
        description: 'Successful operation',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/commonOfficialLanguages'
            }
          }
        }
      }
    }
  }
}
