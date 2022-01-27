import { serverError, LoadMolCountry, LoadMolCountryController, MolCountryModel, ok, HttpRequest } from './load-mol-country-protocols'

const makeFakeCountry = (): MolCountryModel => ({
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

const makeLoadMolCountry = (): LoadMolCountry => {
  class LoadMolCountryStub implements LoadMolCountry {
    async loadByLanguage (): Promise<MolCountryModel> {
      return Promise.resolve(makeFakeCountry())
    }
  }
  return new LoadMolCountryStub()
}

interface SutTypes {
  sut: LoadMolCountryController
  loadMolCountryStub: LoadMolCountry
}

const makeSut = (): SutTypes => {
  const loadMolCountryStub = makeLoadMolCountry()
  const sut = new LoadMolCountryController(loadMolCountryStub)

  return {
    sut,
    loadMolCountryStub
  }
}

describe('LoadMolCountry Controller', () => {
  test('Should call LoadMolCountry with correct values', async () => {
    const { sut, loadMolCountryStub } = makeSut()
    const loadSpy = jest.spyOn(loadMolCountryStub, 'loadByLanguage')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('de')
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    const country: MolCountryModel = makeFakeCountry()
    expect(httpResponse).toEqual(ok({ ...country }))
  })

  test('Should return 500 if LoadMolCountry throws', async () => {
    const { sut, loadMolCountryStub } = makeSut()
    jest.spyOn(loadMolCountryStub, 'loadByLanguage').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
