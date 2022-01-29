import { Validation } from '../../../presentation/protocols/validation'
import { RequiredFieldValidation, ValidationComposite } from '../../../presentation/helpers/validators'

export const makeLoadCountryMostOfficialLanguagesValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['language']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
