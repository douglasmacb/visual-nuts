import { ok, serverError, Controller, HttpRequest, HttpResponse, MolCountryModel, LoadMolCountry } from './load-mol-country-protocols'

export class LoadMolCountryController implements Controller {
  constructor (private readonly loadMolCountry: LoadMolCountry) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { official_language } = httpRequest.query

      const molCountry: MolCountryModel = await this.loadMolCountry.loadByLanguage(official_language)
      return ok({ ...molCountry })
    } catch (error) {
      return serverError(error)
    }
  }
}
