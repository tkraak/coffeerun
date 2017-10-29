import test from 'ava'
import sinon from 'sinon'
import { JSDOM } from 'jsdom'
import Chromeless from 'chromeless'

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

test('app title', async t => {
  const chromeless = new Chromeless({ launchChrome: true })
  const title = await chromeless
    .goto('http://localhost:8080')
    .evaluate(() => document.title)

  await chromeless.end()

  t.is(title, 'CoffeeRun')
})
