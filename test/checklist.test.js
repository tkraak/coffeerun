import test from 'ava'
import { spy, stub } from 'sinon'
import { JSDOM } from 'jsdom'

const dom = new JSDOM(`<!DOCTYPE html><html><div data-coffee-order="checklist"></div></html>`)
const window = dom.window
const $ = require('jquery')(window) // eslint-disable-line no-unused-vars
global.window = window
const { CheckList } = require('../app/checklist')
const checkList = '[data-coffee-order="checklist"]'

test('CheckList function exists', t => {
  const cl = new CheckList(checkList)
  t.true(typeof cl === 'object')
})

test('throws error if no selector passed', t => {
  const error = t.throws(() => { CheckList() }, Error)
  t.is(error.message, 'No selector provided.')
})

test('throws error if selector is invalid', t => {
  const error = t.throws(() => { CheckList('test') }, Error)
  t.is(error.message, 'Could not find element with selector: test.')
})

test('addClicktHandler method', t => {
  const cl = new CheckList(checkList)

  const on = stub(cl.$element, 'on').callsFake((type, delegate, callback) => {
    callback.call({ removeRow () {} }, { target: { value: 'test' } })
    t.true(on.calledOnce)
  })

  t.true(typeof cl.addClickHandler === 'function')

  cl.addClickHandler(() => ({ then () {} }))
})

test('addRow method', t => {
  const cl = new CheckList(checkList)
  const removeRow = spy()
  const append = spy()
  const removeClass = spy()

  t.true(typeof cl.addRow === 'function')

  cl.addRow.call({
    removeRow,
    $element: {
      removeClass,
      append
    }
  }, { emailAddress: 'test@test.com' })

  // called once with test@test.com as first argument
  t.is(removeRow.args[0][0], 'test@test.com')
  t.is(removeClass.args[0][0], 'loader-bg')
  t.true(append.calledOnce)
})
