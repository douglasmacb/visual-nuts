import { CountryModel } from "../../../domain/models/country";

export interface LoadCountriesByLanguageRepository {
    loadByLanguage (language: string): Promise<CountryModel[]>
}