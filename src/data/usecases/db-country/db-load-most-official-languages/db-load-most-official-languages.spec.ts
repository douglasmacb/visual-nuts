import { CountryModel } from '../../../../domain/models/country'
import { LoadCommonOfficialLanguages } from '../../../../domain/usecases/load-common-official-languages'
import { LoadCountriesRepository } from '../../../protocols/db-country/load-countries-repository'
import { DbLoadCommonOfficialLanguages } from './db-load-most-official-languages'

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
    sut: LoadCommonOfficialLanguages
    loadCountriesRepositoryStub: LoadCountriesRepository
}

const makeSut = (): SutTypes => {
    const loadCountriesRepositoryStub = makeCountriesRepository()
    const sut = new DbLoadCommonOfficialLanguages(loadCountriesRepositoryStub)

    return {
        sut,
        loadCountriesRepositoryStub
    }
}

describe('DbLoadCommonOfficialLanguages', () => {
    test('Should call LoadCountriesRepository',  async() => {
        const { sut, loadCountriesRepositoryStub } = makeSut()
        const loadAllSpy = jest.spyOn(loadCountriesRepositoryStub, 'loadAll')
        await sut.load()
        expect(loadAllSpy).toHaveBeenCalled()
    })
})