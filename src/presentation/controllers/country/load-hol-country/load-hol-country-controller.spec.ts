import { serverError, LoadHolCountry, LoadHolCountryController, ok, CountryModel } from './load-hol-country-protocols'

const makeFakeCountry = (): CountryModel => ({
  country: 'PT',
  languages: ['de', 'en']
})

const makeLoadHolCountry = (): LoadHolCountry => {
  class LoadHolCountryStub implements LoadHolCountry {
    async load (): Promise<CountryModel> {
      return Promise.resolve(makeFakeCountry())
    }
  }
  return new LoadHolCountryStub()
}

interface SutTypes {
  sut: LoadHolCountryController
  loadHolCountryStub: LoadHolCountry
}

const makeSut = (): SutTypes => {
  const loadHolCountryStub = makeLoadHolCountry()
  const sut = new LoadHolCountryController(loadHolCountryStub)

  return {
    sut,
    loadHolCountryStub
  }
}

describe('LoadHolCountry Controller', () => {
  test('Should call LoadHolCountry', async () => {
    const { sut, loadHolCountryStub } = makeSut()
    const loadSpy = jest.spyOn(loadHolCountryStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    const country: CountryModel = makeFakeCountry()
    expect(httpResponse).toEqual(ok({ ...country }))
  })

  test('Should return 500 if LoadHolCountry throws', async () => {
    const { sut, loadHolCountryStub } = makeSut()
    jest.spyOn(loadHolCountryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
