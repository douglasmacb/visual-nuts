import { serverError, LoadCountryMostOfficialLanguagesController, CountryMostOfficialLanguagesModel, LoadCountryMostOfficialLanguages, ok, HttpRequest } from './load-country-most-official-languages-protocols'

const makeFakeCountry = (): CountryMostOfficialLanguagesModel => ({
  countries: [
    {
      country: 'PT',
      languages: ['de', 'en']
    }
  ],
  languagesCount: 2
})

const makeFakeRequest = (): HttpRequest => ({
  query: {
    official_language: 'de'
  }
})

const makeLoadCountryMostOfficialLanguages = (): LoadCountryMostOfficialLanguages => {
  class LoadCountryMostOfficialLanguagesStub implements LoadCountryMostOfficialLanguages {
    async loadByLanguage (): Promise<CountryMostOfficialLanguagesModel> {
      return Promise.resolve(makeFakeCountry())
    }
  }
  return new LoadCountryMostOfficialLanguagesStub()
}

interface SutTypes {
  sut: LoadCountryMostOfficialLanguagesController
  loadCountryMostOfficialLanguagesStub: LoadCountryMostOfficialLanguages
}

const makeSut = (): SutTypes => {
  const loadCountryMostOfficialLanguagesStub = makeLoadCountryMostOfficialLanguages()
  const sut = new LoadCountryMostOfficialLanguagesController(loadCountryMostOfficialLanguagesStub)

  return {
    sut,
    loadCountryMostOfficialLanguagesStub
  }
}

describe('LoadCountryMostOfficialLanguages Controller', () => {
  test('Should call LoadCountryMostOfficialLanguages with correct values', async () => {
    const { sut, loadCountryMostOfficialLanguagesStub } = makeSut()
    const loadSpy = jest.spyOn(loadCountryMostOfficialLanguagesStub, 'loadByLanguage')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('de')
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    const country: CountryMostOfficialLanguagesModel = makeFakeCountry()
    expect(httpResponse).toEqual(ok({ ...country }))
  })

  test('Should return 500 if LoadMolCountry throws', async () => {
    const { sut, loadCountryMostOfficialLanguagesStub } = makeSut()
    jest.spyOn(loadCountryMostOfficialLanguagesStub, 'loadByLanguage').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
