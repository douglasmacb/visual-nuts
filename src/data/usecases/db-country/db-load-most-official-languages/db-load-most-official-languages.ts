import { Language } from "../../../../domain/models/language";
import { LoadCommonOfficialLanguages } from "../../../../domain/usecases/load-common-official-languages";
import { LoadCountriesRepository } from "../../../protocols/db-country/load-countries-repository";

export class DbLoadCommonOfficialLanguages implements LoadCommonOfficialLanguages {
    constructor (private readonly loadCountriesRepository: LoadCountriesRepository) { }

    async load (): Promise<Language[]> {
        const countries = await this.loadCountriesRepository.loadAll()
        const languages = countries.map(country => country.languages).join().split(',')
        const elements = languages.reduce((a, v) => { a[v] = a[v] ? a[v] + 1 : 1; return a } , {})
        const frequentElements = Object.entries(elements).filter(element => element[1] > 1).map(element => (( { name: element[0] })))
        return frequentElements
    }
}