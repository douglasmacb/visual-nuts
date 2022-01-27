import { ok, serverError, Controller, HttpRequest, HttpResponse, LoadHolCountry, CountryModel } from './load-hol-country-protocols'

export class LoadHolCountryController implements Controller {
  constructor (private readonly loadHolCountry: LoadHolCountry) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const country: CountryModel = await this.loadHolCountry.load()
      return ok({ ...country })
    } catch (error) {
      return serverError(error)
    }
  }
}
