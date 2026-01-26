import test from 'ava'
import { fake, restore, stub } from 'sinon'
import { JSDOM } from 'jsdom'

const { window } = new JSDOM('<!DOCTYPE html><html><body></body></html>')

global.window = window
global.document = window.document
const { CheckList } = require('../app/checklist')
let checklistCounter = 0

const createChecklistFixture = () => {
  checklistCounter += 1
  const element = document.createElement('div')
  const checklistId = `checklist-${checklistCounter}`

  element.dataset.coffeeOrder = checklistId
  document.body.appendChild(element)

  return {
    element,
    selector: `[data-coffee-order="${checklistId}"]`
  }
}

test.beforeEach(t => {
  t.context.fixture = createChecklistFixture()
})

test.afterEach('restore default sandbox', t => {
  restore()
  t.context.fixture.element.remove()
})

test('CheckList function exists', t => {
  const { selector } = t.context.fixture
  const cl = new CheckList(selector)
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

test('addClickHandler method', async t => {
  const { selector } = t.context.fixture
  const cl = new CheckList(selector)
  const callback = stub()
  const e = { target: { value: 'test@test.com', matches: stub().returns(true) } }
  const addEventListenerStub = stub(cl.element, 'addEventListener')
  addEventListenerStub.withArgs('click').yields(e)
  const removeRow = fake()

  await cl.addClickHandler.call({ removeRow, element: { addEventListener: addEventListenerStub } }, callback.resolves())

  t.true(addEventListenerStub.calledOnce)
  t.true(callback.calledWith('test@test.com'))
  t.true(removeRow.calledWith('test@test.com'))
})

test('addClickHandler ignores non-input targets', async t => {
  const { selector } = t.context.fixture
  const cl = new CheckList(selector)
  const callback = stub()
  const e = { target: { value: 'test@test.com', matches: stub().returns(false) } }
  const addEventListenerStub = stub(cl.element, 'addEventListener')
  addEventListenerStub.withArgs('click').yields(e)
  const removeRow = fake()

  await cl.addClickHandler.call({ removeRow, element: { addEventListener: addEventListenerStub } }, callback.resolves())

  t.true(addEventListenerStub.calledOnce)
  t.false(callback.called)
  t.false(removeRow.called)
})

test('addRow method', t => {
  const { selector } = t.context.fixture
  const cl = new CheckList(selector)
  const removeRow = fake()
  const classList = { remove: fake() }
  const appendChild = fake()

  t.true(typeof cl.addRow === 'function')

  cl.addRow.call({
    removeRow,
    element: {
      classList,
      appendChild
    }
  }, { emailAddress: 'test@test.com' })

  t.true(removeRow.calledWith('test@test.com'))
  t.true(classList.remove.calledWith('loader-bg'))
  t.true(appendChild.calledOnce)
})

test('removeRow method', t => {
  const { selector } = t.context.fixture
  const cl = new CheckList(selector)
  const remove = fake()
  const closest = fake.returns({ remove })
  const querySelector = fake.returns({ closest })

  t.true(typeof cl.removeRow === 'function')

  cl.removeRow.call({
    element: {
      querySelector
    }
  }, 'test@test.com')

  t.true(querySelector.calledWith('[value="test@test.com"]'))
  t.true(closest.calledWith('[data-coffee-order="checkbox"]'))
  t.true(remove.calledOnce)
})

test('removeRow exits when checkbox missing', t => {
  const { selector } = t.context.fixture
  const cl = new CheckList(selector)
  const querySelector = fake.returns(null)

  t.true(typeof cl.removeRow === 'function')

  cl.removeRow.call({
    element: {
      querySelector
    }
  }, 'test@test.com')

  t.true(querySelector.calledWith('[value="test@test.com"]'))
})

test('removeRow exits when row missing', t => {
  const { selector } = t.context.fixture
  const cl = new CheckList(selector)
  const closest = fake.returns(null)
  const querySelector = fake.returns({ closest })

  cl.removeRow.call({
    element: {
      querySelector
    }
  }, 'test@test.com')

  t.true(querySelector.calledWith('[value="test@test.com"]'))
  t.true(closest.calledWith('[data-coffee-order="checkbox"]'))
})
