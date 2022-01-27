import { ok, serverError, Controller, HttpRequest, HttpResponse, MolCountryModel, LoadMolCountry } from './load-mol-country-protocols'

export class LoadMolCountryController implements Controller {
  constructor (private readonly loadMolCountry: LoadMolCountry) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { language } = httpRequest.params
      const country: MolCountryModel = await this.loadMolCountry.loadByLanguage(language)
      return ok({ country })
    } catch (error) {
      return serverError(error)
    }
  }
}
