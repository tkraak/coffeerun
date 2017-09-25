import test from 'ava'
const { JSDOM } = require('jsdom')

const form = '[data-coffee-order="form"]'

test('FormHandler function exists', t => {
  return JSDOM.fromFile('./index.html').then(dom => {
    const $ = require('jquery')(dom.window)  // eslint-disable-line no-unused-vars
    global.window = dom.window
    const { FormHandler } = require('../app/formhandler.js')
    const fh = new FormHandler(form)
    t.true(typeof fh === 'object')
  }).catch(error => {
    console.log(error)
  })
})

test('throws error if no selector passed', t => {
  return JSDOM.fromFile('./index.html').then(dom => {
    const $ = require('jquery')(dom.window)  // eslint-disable-line no-unused-vars
    global.window = dom.window
    const { FormHandler } = require('../app/formhandler.js')
    const error = t.throws(() => { FormHandler() }, Error)
    t.is(error.message, 'No selector provided.')
  }).catch(error => {
    console.log(error)
  })
})

test('throws error if selector is invalid', t => {
  return JSDOM.fromFile('./index.html').then(dom => {
    const $ = require('jquery')(dom.window)  // eslint-disable-line no-unused-vars
    global.window = dom.window
    const { FormHandler } = require('../app/formhandler.js')
    const error = t.throws(() => { FormHandler('test') }, Error)
    t.is(error.message, 'Could not find element with selector: test.')
  }).catch(error => {
    console.log(error)
  })
})

test('addSubmitHandler method exists', t => {
  return JSDOM.fromFile('./index.html').then(dom => {
    const $ = require('jquery')(dom.window)  // eslint-disable-line no-unused-vars
    global.window = dom.window
    const { FormHandler } = require('../app/formhandler.js')
    const fh = new FormHandler(form)
    t.true(typeof fh.addSubmitHandler === 'function')
  }).catch(error => {
    console.log(error)
  })
})

test('serializeArray', t => {
  return JSDOM.fromFile('./index.html').then(dom => {
    const $ = require('jquery')(dom.window)  // eslint-disable-line no-unused-vars
    global.window = dom.window
    $('input[type=text][name=coffee]').val('test')
    $('input[type=text][name=emailAddress]').val('test@test.com')
    // $('button[type=submit]').trigger('click')
    const { FormHandler } = require('../app/formhandler.js')
    const fh = new FormHandler(form)
    fh.addSubmitHandler(() => {})
    t.true(typeof fh.$formElement.on === 'function')
  }).catch(error => {
    console.log(error)
  })
})
