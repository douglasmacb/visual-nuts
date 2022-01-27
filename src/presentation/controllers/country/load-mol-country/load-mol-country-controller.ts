import { ok, serverError, Controller, HttpRequest, HttpResponse, CountryModel, LoadMolCountry } from './load-mol-country-protocols'

export class LoadMolCountryController implements Controller {
  constructor (private readonly loadMolCountry: LoadMolCountry) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const country: CountryModel = await this.loadMolCountry.load()
      return ok({ country })
    } catch (error) {
      return serverError(error)
    }
  }
}
