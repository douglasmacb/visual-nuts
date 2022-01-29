import { ok, serverError, badRequest, Validation, Controller, HttpRequest, HttpResponse, CountryMostOfficialLanguagesModel, LoadCountryMostOfficialLanguages } from './load-country-most-official-languages-protocols'

export class LoadCountryMostOfficialLanguagesController implements Controller {
  constructor (private readonly loadCountryMostOfficialLanguages: LoadCountryMostOfficialLanguages, private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { language } = httpRequest.params

      const error = this.validation.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }

      const molCountry: CountryMostOfficialLanguagesModel = await this.loadCountryMostOfficialLanguages.loadByLanguage(language)
      return ok({ ...molCountry })
    } catch (error) {
      return serverError(error)
    }
  }
}
