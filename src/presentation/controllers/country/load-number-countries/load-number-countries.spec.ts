import { NumberCountry } from '../../../../domain/models/number-country'
import { LoadNumberCountriesController } from './load-number-countries-controller'
import { LoadNumberCountries } from './load-number-countries-protocols'

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
  quantity: 0
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
})
