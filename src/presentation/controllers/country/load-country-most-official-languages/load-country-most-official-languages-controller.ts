import { ok, serverError, Controller, HttpRequest, HttpResponse, CountryMostOfficialLanguagesModel, LoadCountryMostOfficialLanguages } from './load-country-most-official-languages-protocols'

export class LoadCountryMostOfficialLanguagesController implements Controller {
  constructor (private readonly loadCountryMostOfficialLanguages: LoadCountryMostOfficialLanguages) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { official_language } = httpRequest.query

      const molCountry: CountryMostOfficialLanguagesModel = await this.loadCountryMostOfficialLanguages.loadByLanguage(official_language)
      return ok({ ...molCountry })
    } catch (error) {
      return serverError(error)
    }
  }
}
