import { serverError, LoadMolCountry, LoadMolCountryController, CountryModel, ok } from './load-mol-country-protocols'

const makeFakeCountry = (): CountryModel => ({
  country: 'PT',
  languages: ['de', 'en']
})

const makeLoadMolCountry = (): LoadMolCountry => {
  class LoadMolCountryStub implements LoadMolCountry {
    async load (): Promise<CountryModel> {
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
  test('Should call LoadMolCountry', async () => {
    const { sut, loadMolCountryStub } = makeSut()
    const loadSpy = jest.spyOn(loadMolCountryStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    const country: CountryModel = makeFakeCountry()
    expect(httpResponse).toEqual(ok({ country }))
  })

  test('Should return 500 if LoadMolCountry throws', async () => {
    const { sut, loadMolCountryStub } = makeSut()
    jest.spyOn(loadMolCountryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
