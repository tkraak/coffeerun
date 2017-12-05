import test from 'ava'
import { Validation } from '../app/validation'

test('isCompanyEmail', t => {
  t.is(Validation.isCompanyEmail('test@test.com'), true)
})
