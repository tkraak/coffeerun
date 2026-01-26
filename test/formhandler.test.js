import test from 'ava'
import { fake, restore, stub } from 'sinon'
import { JSDOM } from 'jsdom'
import { Validation } from '../app/validation'

const { window } = new JSDOM('<!DOCTYPE html><html><body></body></html>')

global.window = window
global.document = window.document
const { FormHandler } = require('../app/formhandler')
let formCounter = 0

const createFormFixture = () => {
  formCounter += 1
  const formElement = document.createElement('form')
  const emailInput = document.createElement('input')
  const coffeeInput = document.createElement('input')
  const formId = `form-${formCounter}`

  formElement.dataset.coffeeOrder = formId
  emailInput.name = 'emailAddress'
  emailInput.value = 'test@test.com'
  coffeeInput.name = 'coffee'
  coffeeInput.value = 'black'

  formElement.appendChild(emailInput)
  formElement.appendChild(coffeeInput)
  document.body.appendChild(formElement)

  return {
    formElement,
    emailInput,
    coffeeInput,
    selector: `[data-coffee-order="${formId}"]`
  }
}

test.beforeEach(t => {
  t.context.fixture = createFormFixture()
})

test.afterEach('restore default sandbox', t => {
  restore()
  t.context.fixture.formElement.remove()
})

test('FormHandler function exists', t => {
  const { selector } = t.context.fixture
  const fh = new FormHandler(selector)
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
  const { selector, formElement } = t.context.fixture
  const fh = new FormHandler(selector)
  const callback = stub()
  const e = {
    preventDefault: fake()
  }

  formElement.reset = fake()
  formElement.elements[1].focus = fake()

  const originalFormData = global.FormData
  global.FormData = function () {
    return {
      forEach: forEachCallback => {
        forEachCallback('black', 'coffee')
        forEachCallback('test@test.com', 'emailAddress')
      }
    }
  }

  const addEventListenerStub = stub(fh.formElement, 'addEventListener')
  addEventListenerStub.withArgs('submit').callsFake((_eventName, handler) => {
    handler.call(formElement, e)
  })

  await fh.addSubmitHandler(callback.resolves())

  global.FormData = originalFormData

  t.true(typeof fh.addSubmitHandler === 'function')
  t.true(addEventListenerStub.calledWith('submit'))
  t.true(typeof addEventListenerStub.args[0][1] === 'function')
  t.true(e.preventDefault.calledOnce)
  t.true(callback.calledWithMatch({
    coffee: 'black',
    emailAddress: 'test@test.com'
  }))
  t.true(formElement.reset.called)
  t.true(formElement.elements[1].focus.calledOnce)
})

test('addInputHandler invalid', t => {
  const { selector } = t.context.fixture
  const fh = new FormHandler(selector)
  const message = 'test@aol.com is not an authorized email address!'
  const e = {
    target: {
      value: 'test@aol.com',
      setCustomValidity: fake(),
      matches: stub().returns(true)
    }
  }
  const addEventListenerStub = stub(fh.formElement, 'addEventListener')
  addEventListenerStub.withArgs('input').yields(e)

  fh.addInputHandler(Validation.isCompanyEmail)

  t.true(typeof fh.addInputHandler === 'function')
  t.true(addEventListenerStub.calledOnce)
  t.true(e.target.setCustomValidity.calledWith(message))
})

test('addInputHandler valid', t => {
  const { selector } = t.context.fixture
  const fh = new FormHandler(selector)
  const message = ''
  const e = {
    target: {
      value: 'test@test.com',
      setCustomValidity: fake(),
      matches: stub().returns(true)
    }
  }
  const addEventListenerStub = stub(fh.formElement, 'addEventListener')
  addEventListenerStub.withArgs('input').yields(e)

  fh.addInputHandler(Validation.isCompanyEmail)

  t.true(addEventListenerStub.calledOnce)
  t.true(e.target.setCustomValidity.calledWith(message))
})

test('addInputHandler ignores non-email inputs', t => {
  const { selector } = t.context.fixture
  const fh = new FormHandler(selector)
  const e = {
    target: {
      value: 'test@test.com',
      setCustomValidity: fake(),
      matches: stub().returns(false)
    }
  }
  const callback = stub()
  const addEventListenerStub = stub(fh.formElement, 'addEventListener')
  addEventListenerStub.withArgs('input').yields(e)

  fh.addInputHandler(callback)

  t.true(addEventListenerStub.calledOnce)
  t.false(callback.called)
  t.false(e.target.setCustomValidity.called)
})
