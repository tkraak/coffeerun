import test from 'ava'
import { spy, fake, stub } from 'sinon'
import window from './helpers/window'

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

test('addClicktHandler method', async t => {
  const cl = new CheckList(checkList)
  /*
   * hack note
   * const callback = stub().returns({ then: stub().yields() })
   * use callback.resolves() and async/await instead
   */
  const callback = stub()
  const e = { target: { value: 'test@test.com' } }
  const on = stub(cl.$element, 'on').yields(e)
  const removeRow = fake()

  await cl.addClickHandler.call({ removeRow, $element: { on } }, callback.resolves())

  t.true(on.calledOnce)
  t.true(callback.calledWith('test@test.com'))
  t.true(removeRow.calledWith('test@test.com'))
})

test('addRow method', t => {
  const cl = new CheckList(checkList)
  const removeRow = fake()
  const append = fake()
  const removeClass = fake()

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

test('removeRow method', t => {
  const cl = new CheckList(checkList)
  const remove = spy()
  const closest = fake.returns({ remove })
  const find = fake.returns({ closest })

  t.true(typeof cl.removeRow === 'function')

  cl.removeRow.call({
    $element: {
      find
    }
  }, 'test@test.com')

  t.is(find.args[0][0], '[value="test@test.com"]')
  t.is(closest.args[0][0], '[data-coffee-order="checkbox"]')
  t.true(remove.calledOnce)
})
