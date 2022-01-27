import { MolCountryModel } from '../models/mol-country'

export interface LoadMolCountry {
  loadByLanguage (language: string): Promise<MolCountryModel>
}
