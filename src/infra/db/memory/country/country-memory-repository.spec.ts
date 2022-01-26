import { LoadCountriesRepository } from '../../../../data/protocols/db/load-countries-repository'
import { CountryMemoryRepository } from './country-memory-repository'

interface SutTypes {
  sut: LoadCountriesRepository
}

const makeSut = (): SutTypes => {
  const sut = new CountryMemoryRepository()

  return {
    sut
  }
}

describe('loadAll()', () => {
  test('Should load countries on success', async () => {
    const { sut } = makeSut()
    const countries = await sut.loadAll()
    expect(countries).toBeTruthy()
    expect(countries.length).toBeGreaterThan(0)
  })
})
