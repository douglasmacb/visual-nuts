import { CountryMostOfficialLanguagesModel } from "../../../../domain/models/country-most-official-languages";
import { LoadCountryMostOfficialLanguages } from "../../../../domain/usecases/load-country-most-official-languages";
import { CountryMemoryRepository } from "../../../../infra/db/memory/country/country-memory-repository";

export class DbLoadCountryMostOfficialLanguages implements LoadCountryMostOfficialLanguages {
    constructor (private readonly countryMemoryRepository: CountryMemoryRepository) { }

    async loadByLanguage (language: string): Promise<CountryMostOfficialLanguagesModel> {
        const countries = await this.countryMemoryRepository.loadByLanguage(language)
        const maxOfficialLanguages = countries.map(country => country.languages.length).reduce((a, b) => Math.max(a, b) , 0)
        const countriesMostOfficialLanguages = countries.filter(country => country.languages.length === maxOfficialLanguages)

        const countryMostOfficialLanguages: CountryMostOfficialLanguagesModel = {
            countries: countriesMostOfficialLanguages,
            languagesCount: maxOfficialLanguages
        }
        return countryMostOfficialLanguages
    }
}