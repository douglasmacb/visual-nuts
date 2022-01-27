import { CountryModel } from '../models/country-model'

export interface LoadMolCountry {
  load (): Promise<CountryModel>
}
