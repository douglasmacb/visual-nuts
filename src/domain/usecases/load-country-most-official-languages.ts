import { CountryMostOfficialLanguagesModel } from '../models/country-most-official-languages'

export interface LoadCountryMostOfficialLanguages {
  loadByLanguage (language: string): Promise<CountryMostOfficialLanguagesModel>
}
