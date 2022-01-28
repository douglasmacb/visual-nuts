import { Language } from '../models/language'

export interface LoadCommonOfficialLanguages {
  load (): Promise<Language[]>
}
