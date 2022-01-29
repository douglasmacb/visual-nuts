import { serverError, badRequest, MissingParamError, Validation, LoadCountryMostOfficialLanguagesController, CountryMostOfficialLanguagesModel, LoadCountryMostOfficialLanguages, ok, HttpRequest } from './load-country-most-official-languages-protocols'

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
  params: {
    language: 'any_language'
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

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
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const loadCountryMostOfficialLanguagesStub = makeLoadCountryMostOfficialLanguages()
  const validationStub = makeValidation()
  const sut = new LoadCountryMostOfficialLanguagesController(loadCountryMostOfficialLanguagesStub, validationStub)

  return {
    sut,
    loadCountryMostOfficialLanguagesStub,
    validationStub
  }
}

describe('LoadCountryMostOfficialLanguages Controller', () => {
  test('Should call LoadCountryMostOfficialLanguages with correct values', async () => {
    const { sut, loadCountryMostOfficialLanguagesStub } = makeSut()
    const loadSpy = jest.spyOn(loadCountryMostOfficialLanguagesStub, 'loadByLanguage')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_language')
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    const country: CountryMostOfficialLanguagesModel = makeFakeCountry()
    expect(httpResponse).toEqual(ok({ ...country }))
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should return 500 if LoadMolCountry throws', async () => {
    const { sut, loadCountryMostOfficialLanguagesStub } = makeSut()
    jest.spyOn(loadCountryMostOfficialLanguagesStub, 'loadByLanguage').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
