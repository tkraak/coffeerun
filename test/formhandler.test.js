import test from 'ava'
import sinon from 'sinon'
import { Validation } from '../app/validation'
import { JSDOM } from 'jsdom'

const dom = new JSDOM(`<!DOCTYPE html><html><form data-coffee-order="form"></form></html>`)
const window = dom.window
const $ = require('jquery')(window) // eslint-disable-line no-unused-vars
global.window = window
const { FormHandler } = require('../app/formhandler.js')
const form = '[data-coffee-order="form"]'

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

test('addSubmitHandler method', t => {
  const fh = new FormHandler(form)

  const on = sinon.stub(fh.$formElement, 'on').callsFake((type, callback) => {
    callback.call({ reset () {}, elements: [{}, { focus () {} }] }, { preventDefault () {} })
    t.true(on.calledOnce)
  })

  const sa = sinon.stub($.prototype, 'serializeArray').callsFake(() => {
    t.true(sa.calledOnce)
    const forEach = {
      forEach: sinon.stub().callsFake(function (callback) {
        const field = {}
        callback(field)
        t.true(this.forEach.calledOnce)
      })
    }
    return forEach
  })

  t.true(typeof fh.addSubmitHandler === 'function')

  fh.addSubmitHandler(() => {})
})

test('addInputHandler invalid', t => {
  const fh = new FormHandler(form)
  const setCustomValidity = sinon.spy()
  const message = 'test@aol.com is not an authorized email address!'

  const on = sinon.stub(fh.$formElement, 'on').callsFake((type, delegate, callback) => {
    callback.call({}, { target: { value: 'test@aol.com', setCustomValidity } })
    t.true(on.calledOnce)
    t.true(setCustomValidity.calledOnce)
    t.true(setCustomValidity.calledWith(message))
    t.is(type, 'input')
    t.is(delegate, '[name="emailAddress"]')
  })

  t.true(typeof fh.addInputHandler === 'function')

  fh.addInputHandler(Validation.isCompanyEmail)
})

test('addInputHandler valid', t => {
  const fh = new FormHandler(form)
  const setCustomValidity = sinon.spy()
  const message = ''

  const on = sinon.stub(fh.$formElement, 'on').callsFake((type, delegate, callback) => {
    callback.call({}, { target: { value: 'test@test.com', setCustomValidity } })
    t.true(on.calledOnce)
    t.true(setCustomValidity.calledOnce)
    t.true(setCustomValidity.calledWith(message))
  })

  fh.addInputHandler(Validation.isCompanyEmail)
})
