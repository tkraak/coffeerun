import test from 'ava'
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

test('addSubmitHandler method exists', t => {
  const fh = new FormHandler(form)
  fh.addSubmitHandler(() => {})
  t.true(typeof fh.addSubmitHandler === 'function')
  t.true(typeof fh.$formElement.on === 'function')
})
