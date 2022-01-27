import { LoadNumberCountriesController } from './load-number-countries-controller'
import { LoadNumberCountries, NumberCountry, ok, serverError } from './load-number-countries-protocols'
import faker from 'faker'

interface SutTypes {
  sut: LoadNumberCountriesController
  loadNumberCountriesStub: LoadNumberCountries
}

const makeSut = (): SutTypes => {
  const loadNumberCountriesStub = makeCountries()
  const sut = new LoadNumberCountriesController(loadNumberCountriesStub)

  return {
    sut,
    loadNumberCountriesStub
  }
}

const NUMBER_COUNTRIES = faker.random.number()

const makeFakeNumberCountries = (): NumberCountry => ({
  quantity: NUMBER_COUNTRIES
})

const makeCountries = (): LoadNumberCountries => {
  class LoadCountriesStub implements LoadNumberCountries {
    async load (): Promise<NumberCountry> {
      return new Promise(resolve => resolve(makeFakeNumberCountries()))
    }
  }
  return new LoadCountriesStub()
}

describe('LoadNumberCountries Controller', () => {
  test('Should call loadNumberCountries', async () => {
    const { sut, loadNumberCountriesStub } = makeSut()
    const loadSpy = jest.spyOn(loadNumberCountriesStub, 'load')

    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    const countries: NumberCountry = makeFakeNumberCountries()
    expect(httpResponse).toEqual(ok({ countries }))
  })

  test('Should return 500 if LoadNumberCountries throws', async () => {
    const { sut, loadNumberCountriesStub } = makeSut()
    jest.spyOn(loadNumberCountriesStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
