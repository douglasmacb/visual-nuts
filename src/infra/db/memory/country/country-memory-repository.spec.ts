import { CountryMemoryRepository } from './country-memory-repository'

interface SutTypes {
  sut: CountryMemoryRepository
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

describe('loadByLanguage()', () => {
  test('Should load countries by language on success', async () => {
    const { sut } = makeSut()
    const countries = await sut.loadByLanguage('de')
    expect(countries).toBeTruthy()
    expect(countries.length).toBeGreaterThan(0)
  })
})
