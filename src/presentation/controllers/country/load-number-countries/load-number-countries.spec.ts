import { LoadNumberCountriesController } from './load-number-countries-controller'
import { LoadNumberCountries, NumberCountry, serverError } from './load-number-countries-protocols'
import faker from 'faker'

interface SutTypes {
  sut: LoadNumberCountriesController
  loadCountriesStub: LoadNumberCountries
}

const makeSut = (): SutTypes => {
  const loadCountriesStub = makeCountries()
  const sut = new LoadNumberCountriesController(loadCountriesStub)

  return {
    sut,
    loadCountriesStub
  }
}

const makeFakeNumberCountries = (): NumberCountry => ({
  quantity: faker.random.number()
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
  test('Should call LoadNumberCountries', async () => {
    const { sut, loadCountriesStub } = makeSut()
    const loadSpy = jest.spyOn(loadCountriesStub, 'load')

    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 500 if LoadNumberCountries throws', async () => {
    const { sut, loadCountriesStub } = makeSut()
    jest.spyOn(loadCountriesStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
