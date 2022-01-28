import { LoadCommonOfficialLanguagesController } from './load-common-official-languages-controller'
import { Language, LoadCommonOfficialLanguages, ok, serverError } from './load-common-official-languages-protocols'

interface SutTypes {
  sut: LoadCommonOfficialLanguagesController
  loadCommonOfficialLanguagesControllerStub: LoadCommonOfficialLanguages
}

const makeSut = (): SutTypes => {
  const loadCommonOfficialLanguagesControllerStub = makeCountries()
  const sut = new LoadCommonOfficialLanguagesController(loadCommonOfficialLanguagesControllerStub)

  return {
    sut,
    loadCommonOfficialLanguagesControllerStub
  }
}

const makeFakeCountriesLanguages = (): Language[] => ([
  {
    name: 'de'
  },
  {
    name: 'nl'
  }
])

const makeCountries = (): LoadCommonOfficialLanguages => {
  class LoadCountriesStub implements LoadCommonOfficialLanguages {
    async load (): Promise<Language[]> {
      return new Promise(resolve => resolve(makeFakeCountriesLanguages()))
    }
  }
  return new LoadCountriesStub()
}

describe('LoadCommonOfficialLanguages Controller', () => {
  test('Should call loadCommonOfficialLanguages', async () => {
    const { sut, loadCommonOfficialLanguagesControllerStub } = makeSut()
    const loadSpy = jest.spyOn(loadCommonOfficialLanguagesControllerStub, 'load')

    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    const languages: Language[] = makeFakeCountriesLanguages()
    expect(httpResponse).toEqual(ok({ languages }))
  })

  test('Should return 500 if LoadCommonOfficialLanguages throws', async () => {
    const { sut, loadCommonOfficialLanguagesControllerStub } = makeSut()
    jest.spyOn(loadCommonOfficialLanguagesControllerStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
