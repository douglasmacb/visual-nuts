import { CountryModel } from "../../../../domain/models/country";
import { LoadCountryHighestNumberOfficialLanguages } from "../../../../domain/usecases/load-country-highest-number-official-languages";
import { CountryMemoryRepository } from "../../../../infra/db/memory/country/country-memory-repository";

export class DbLoadCountryHighestNumberOfficialLanguages implements LoadCountryHighestNumberOfficialLanguages {
    constructor (private readonly countryMemoryRepository: CountryMemoryRepository) { }

    async load (): Promise<CountryModel> {
        const countries = await this.countryMemoryRepository.loadAll()
        const highestNumberOfficialLanguages = countries.map(country => country.languages.length).reduce((a, b) => Math.max(a, b), 0)
        const country: CountryModel = countries.find(country => country.languages.length === highestNumberOfficialLanguages)
        return country
    }
}