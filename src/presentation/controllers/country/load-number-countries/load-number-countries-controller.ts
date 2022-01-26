import { ok, serverError, NumberCountry, Controller, HttpRequest, HttpResponse, LoadNumberCountries } from './load-number-countries-protocols'

export class LoadNumberCountriesController implements Controller {
  constructor (private readonly loadNumberCountries: LoadNumberCountries) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const number: NumberCountry = await this.loadNumberCountries.load()
      return ok({ number })
    } catch (error) {
      return serverError(error)
    }
  }
}
