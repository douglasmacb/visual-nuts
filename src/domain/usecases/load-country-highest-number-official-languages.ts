import { CountryModel } from '../models/country'

export interface LoadCountryHighestNumberOfficialLanguages {
  load (): Promise<CountryModel>
}
