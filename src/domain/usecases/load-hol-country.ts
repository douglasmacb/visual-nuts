import { CountryModel } from '../models/country'

export interface LoadHolCountry {
  load (): Promise<CountryModel>
}
