import { NumberCountry } from '../models/number-country'

export interface LoadNumberCountries {
  load (): Promise<NumberCountry>
}
