import test from 'ava'
import { fake, restore, stub } from 'sinon'
import window from './helpers/window'
import { Validation } from '../app/validation'

global.window = window
const { FormHandler } = require('../app/formhandler')
const form = '[data-coffee-order="form"]'

test.afterEach('restore default sandbox', () => restore())

test('FormHandler function exists', t => {
  const fh = new FormHandler(form)
  t.true(typeof fh === 'object')
})

test('throws error if no selector passed', t => {
  const error = t.throws(() => { FormHandler() }, Error)
  t.is(error.message, 'No selector provided.')
})

test('throws error if selector is invalid', t => {
  const error = t.throws(() => { FormHandler('test') }, Error)
  t.is(error.message, 'Could not find element with selector: test.')
})

test('addSubmitHandler method', async t => {
  const fh = new FormHandler(form)
  const callback = stub()
  const ctx = {
    reset: fake(),
    elements: [{}, { focus: fake() }]
  }
  const e = {
    preventDefault: fake()
  }

  const forEach = stub().yields({})
  const on = stub(fh.$formElement, 'on').yieldsOn(ctx, e)
  const sa = stub(window.$.prototype, 'serializeArray').returns({ forEach })

  await fh.addSubmitHandler(callback.resolves())

  t.true(typeof fh.addSubmitHandler === 'function')
  t.true(on.calledWith('submit'))
  t.true(typeof on.args[0][1] === 'function')
  t.true(e.preventDefault.calledOnce)
  t.true(sa.calledOnce)
  t.true(typeof forEach.args[0][0] === 'function')
  t.true(callback.called)
  t.true(ctx.reset.called)
  t.true(ctx.elements[1].focus.calledOnce)
})

test('addInputHandler invalid', t => {
  const fh = new FormHandler(form)
  const message = 'test@aol.com is not an authorized email address!'
  const e = {
    target: {
      value: 'test@aol.com',
      setCustomValidity: fake()
    }
  }
  const on = stub(fh.$formElement, 'on').yields(e)

  fh.addInputHandler(Validation.isCompanyEmail)

  t.true(typeof fh.addInputHandler === 'function')
  t.true(on.calledOnce)
  t.true(e.target.setCustomValidity.calledWith(message))
})

test('addInputHandler valid', t => {
  const fh = new FormHandler(form)
  const message = ''
  const e = {
    target: {
      value: 'test@test.com',
      setCustomValidity: fake()
    }
  }
  const on = stub(fh.$formElement, 'on').yields(e)

  fh.addInputHandler(Validation.isCompanyEmail)

  t.true(on.calledOnce)
  t.true(e.target.setCustomValidity.calledWith(message))
})
