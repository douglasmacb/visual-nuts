import { CountryModel } from "../../../../domain/models/country"
import { DbLoadCountryMostOfficialLanguages } from './db-load-country-most-official-languages'
import { CountryMemoryRepository } from "../../../../infra/db/memory/country/country-memory-repository"
import { LoadCountryMostOfficialLanguages } from "../../../../domain/usecases/load-country-most-official-languages"

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
    sut: LoadCountryMostOfficialLanguages
    countryMemoryRepositoryStub: CountryMemoryRepository
}

const makeSut = (): SutTypes => {
    const countryMemoryRepositoryStub = makeCountryMemoryRepository()
    const sut = new DbLoadCountryMostOfficialLanguages(countryMemoryRepositoryStub)

    return {
        sut,
        countryMemoryRepositoryStub
    }
}

const fakeLanguage: string = 'de'

describe('DbLoadCountryMostOfficialLanguages', () => {
    test('Should call CountryMemoryRepository',  async() => {
        const { sut, countryMemoryRepositoryStub } = makeSut()
        const loadAllSpy = jest.spyOn(countryMemoryRepositoryStub, 'loadByLanguage')
        await sut.loadByLanguage(fakeLanguage)
        expect(loadAllSpy).toHaveBeenCalled()
    })

    test('Should return the country with the most official languages on success', async () => {
        const { sut } = makeSut()
        const country = await sut.loadByLanguage(fakeLanguage)
        expect(country).toEqual({
            countries: [{
                country: 'BE',
                languages: ['nl', 'fr', 'de'],
            }],
            languagesCount: 3
        })
      })
})