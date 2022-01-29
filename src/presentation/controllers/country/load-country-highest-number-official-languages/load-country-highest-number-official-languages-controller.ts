import { ok, serverError, Controller, HttpRequest, HttpResponse, LoadCountryHighestNumberOfficialLanguages, CountryModel } from './load-country-highest-number-official-languages-protocols'

export class LoadCountryHighestNumberOfficialLanguagesController implements Controller {
  constructor (private readonly loadCountryHighestNumberOfficialLanguages: LoadCountryHighestNumberOfficialLanguages) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const country: CountryModel = await this.loadCountryHighestNumberOfficialLanguages.load()
      return ok({ ...country })
    } catch (error) {
      return serverError(error)
    }
  }
}
