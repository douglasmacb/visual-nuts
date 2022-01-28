import { ok, serverError, Language, Controller, HttpRequest, HttpResponse, LoadCommonOfficialLanguages } from './load-common-official-languages-protocols'

export class LoadCommonOfficialLanguagesController implements Controller {
  constructor (private readonly loadCommonOfficialLanguages: LoadCommonOfficialLanguages) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const languages: Language[] = await this.loadCommonOfficialLanguages.load()
      return ok({ languages })
    } catch (error) {
      return serverError(error)
    }
  }
}
