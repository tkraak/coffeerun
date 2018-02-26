import test from 'ava'
import sinon from 'sinon'
import { Validation } from '../app/validation'
import { JSDOM } from 'jsdom'

const dom = new JSDOM(`<!DOCTYPE html><html><form data-coffee-order="form"></form></html>`)
const window = dom.window
const $ = require('jquery')(window) // eslint-disable-line no-unused-vars
global.window = window
const { FormHandler } = require('../app/formhandler')
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
  // const callback = sinon.stub().resolves({}) // I'm missing somehting
  const callback = sinon.stub().returns({ then: sinon.stub().yields() })
  const ctx = {
    reset: sinon.spy(),
    elements: [{}, { focus: sinon.spy() }]
  }
  const e = {
    preventDefault: sinon.spy()
  }

  const forEach = sinon.stub().yields({})
  const on = sinon.stub(fh.$formElement, 'on').yieldsOn(ctx, e)
  const sa = sinon.stub($.prototype, 'serializeArray').returns({ forEach })

  fh.addSubmitHandler(callback)

  t.true(typeof fh.addSubmitHandler === 'function')
  t.is(on.args[0][0], 'submit')
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
      setCustomValidity: sinon.spy()
    }
  }
  const on = sinon.stub(fh.$formElement, 'on').yields(e)

  fh.addInputHandler(Validation.isCompanyEmail)

  t.true(typeof fh.addInputHandler === 'function')
  t.true(on.calledOnce)
  t.is(e.target.setCustomValidity.args[0][0], message)
})

test('addInputHandler valid', t => {
  const fh = new FormHandler(form)
  const message = ''
  const e = {
    target: {
      value: 'test@test.com',
      setCustomValidity: sinon.spy()
    }
  }
  const on = sinon.stub(fh.$formElement, 'on').yields(e)

  fh.addInputHandler(Validation.isCompanyEmail)

  t.true(on.calledOnce)
  t.is(e.target.setCustomValidity.args[0][0], message)
})
