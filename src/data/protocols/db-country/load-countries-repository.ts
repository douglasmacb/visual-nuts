import { CountryModel } from "../../../domain/models/country";

export interface LoadCountriesRepository {
    loadAll (): Promise<CountryModel[]>
}