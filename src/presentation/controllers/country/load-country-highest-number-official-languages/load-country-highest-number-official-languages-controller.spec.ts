import { serverError, LoadCountryHighestNumberOfficialLanguages, LoadCountryHighestNumberOfficialLanguagesController, ok, CountryModel } from './load-country-highest-number-official-languages-protocols'

const makeFakeCountry = (): CountryModel => ({
  country: 'PT',
  languages: ['de', 'en']
})

const makeLoadCountryHighestNumberOfficialLanguages = (): LoadCountryHighestNumberOfficialLanguages => {
  class LoadHolCountryStub implements LoadCountryHighestNumberOfficialLanguages {
    async load (): Promise<CountryModel> {
      return Promise.resolve(makeFakeCountry())
    }
  }
  return new LoadHolCountryStub()
}

interface SutTypes {
  sut: LoadCountryHighestNumberOfficialLanguagesController
  loadCountryHighestNumberOfficialLanguagesStub: LoadCountryHighestNumberOfficialLanguages
}

const makeSut = (): SutTypes => {
  const loadCountryHighestNumberOfficialLanguagesStub = makeLoadCountryHighestNumberOfficialLanguages()
  const sut = new LoadCountryHighestNumberOfficialLanguagesController(loadCountryHighestNumberOfficialLanguagesStub)

  return {
    sut,
    loadCountryHighestNumberOfficialLanguagesStub
  }
}

describe('LoadCountryHighestNumberOfficialLanguages Controller', () => {
  test('Should call LoadCountryHighestNumberOfficialLanguages', async () => {
    const { sut, loadCountryHighestNumberOfficialLanguagesStub } = makeSut()
    const loadSpy = jest.spyOn(loadCountryHighestNumberOfficialLanguagesStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    const country: CountryModel = makeFakeCountry()
    expect(httpResponse).toEqual(ok({ ...country }))
  })

  test('Should return 500 if LoadCountryHighestNumberOfficialLanguages throws', async () => {
    const { sut, loadCountryHighestNumberOfficialLanguagesStub } = makeSut()
    jest.spyOn(loadCountryHighestNumberOfficialLanguagesStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
