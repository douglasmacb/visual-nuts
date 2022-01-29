import { NumberCountry } from "../../../../domain/models/number-country";
import { LoadNumberCountries } from "../../../../domain/usecases/load-number-countries";
import { LoadCountriesRepository } from "../../../protocols/db-country/load-countries-repository";

export class DbLoadNumberCountries implements LoadNumberCountries {
    constructor (private readonly loadCountriesRepository: LoadCountriesRepository) { }

    async load (): Promise<NumberCountry> {
        const countries = await this.loadCountriesRepository.loadAll()
        const total: NumberCountry = { total: countries.length }
        return total
    }
}