import { makeLoadCountryMostOfficialLanguagesValidation } from './load-country-most-official-languages-validation'
import { RequiredFieldValidation, ValidationComposite } from '../../../presentation/helpers/validators'
import { Validation } from '../../../presentation/protocols/validation'

jest.mock('../../../presentation/helpers/validators/validation-composite')

describe('LoadCountryMostOfficialLanguagesValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoadCountryMostOfficialLanguagesValidation()

    const validations: Validation[] = []
    for (const field of ['language']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
