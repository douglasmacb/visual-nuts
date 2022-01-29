import { CountryModel } from "../../../../domain/models/country"
import { DbLoadCountryHighestNumberOfficialLanguages } from './db-load-country-highest-number-official-languages'
import { CountryMemoryRepository } from "../../../../infra/db/memory/country/country-memory-repository"
import { LoadCountryHighestNumberOfficialLanguages } from "../../../../domain/usecases/load-country-highest-number-official-languages"

const makeFakeCountries = (): CountryModel[] => ([
    {
        country:"US",
        languages: ["en"]
    },
    {
        country:"BE",
        languages: ["nl", "fr", "de"]
    },
    {
        country:"NL",
        languages: ["nl"]
    },
    {
        country:"DE",
        languages: ["de"]
    },
    {
        country:"ES",
        languages: ["es"]
    }
])

const makeCountryMemoryRepository = (): CountryMemoryRepository => {
    class CountryMemoryRepositoryStub implements CountryMemoryRepository {
        async loadAll (): Promise<CountryModel[]> {
            return new Promise(resolve => resolve(makeFakeCountries()))
        }
        
        async loadByLanguage (language: string): Promise<CountryModel[]> {
            return new Promise(resolve => resolve(makeFakeCountries()))
          }
    }
    return new CountryMemoryRepositoryStub()
}


interface SutTypes {
    sut: LoadCountryHighestNumberOfficialLanguages
    countryMemoryRepositoryStub: CountryMemoryRepository
}

const makeSut = (): SutTypes => {
    const countryMemoryRepositoryStub = makeCountryMemoryRepository()
    const sut = new DbLoadCountryHighestNumberOfficialLanguages(countryMemoryRepositoryStub)

    return {
        sut,
        countryMemoryRepositoryStub
    }
}

describe('DbLoadCountryHighestNumberOfficialLanguages', () => {
    test('Should call CountryMemoryRepository',  async() => {
        const { sut, countryMemoryRepositoryStub } = makeSut()
        const loadAllSpy = jest.spyOn(countryMemoryRepositoryStub, 'loadAll')
        await sut.load()
        expect(loadAllSpy).toHaveBeenCalled()
    })

    test('Should return the country with the highest number of official languages on success', async () => {
        const { sut } = makeSut()
        const country = await sut.load()
        expect(country).toEqual({
            country: 'BE',
            languages: ['nl', 'fr', 'de']
        })
      })
})