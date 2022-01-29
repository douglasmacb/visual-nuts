import { CountryModel } from '../../../../domain/models/country'
import { LoadNumberCountries } from '../../../../domain/usecases/load-number-countries'
import { LoadCountriesRepository } from '../../../protocols/db-country/load-countries-repository'
import { DbLoadNumberCountries } from './db-load-number-countries'

const makeFakeCountries = (): CountryModel[] => ([
    {
        country:"US",
        languages: ["en"]
    },
    {
        country:"BE",
        languages: ["nl","fr","de"]
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

const makeCountriesRepository = (): LoadCountriesRepository => {
    class LoadCountriesRepositoryStub implements LoadCountriesRepository {
        async loadAll (): Promise<CountryModel[]> {
            return new Promise(resolve => resolve(makeFakeCountries()))
        }
    }
    return new LoadCountriesRepositoryStub()
}

interface SutTypes {
    sut: LoadNumberCountries
    loadCountriesRepositoryStub: LoadCountriesRepository
}

const makeSut = (): SutTypes => {
    const loadCountriesRepositoryStub = makeCountriesRepository()
    const sut = new DbLoadNumberCountries(loadCountriesRepositoryStub)

    return {
        sut,
        loadCountriesRepositoryStub
    }
}

describe('DbLoadNumberCountries', () => {
    test('Should call LoadCountriesRepository',  async() => {
        const { sut, loadCountriesRepositoryStub } = makeSut()
        const loadAllSpy = jest.spyOn(loadCountriesRepositoryStub, 'loadAll')
        await sut.load()
        expect(loadAllSpy).toHaveBeenCalled()
    })

    test('Should return the countries quantity on success', async () => {
        const { sut } = makeSut()
        const countryNumber = await sut.load()
        expect(countryNumber).toEqual({ total: 5 })

    })
})