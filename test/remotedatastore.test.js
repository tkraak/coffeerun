import test from 'ava'
import { fake, stub } from 'sinon'
import { JSDOM } from 'jsdom'

const { window } = new JSDOM()
global.window = window
const { RemoteDataStore } = require('../app/remotedatastore')

const mockFetchResponse = () => {
  const mockResponse = { json: stub().resolves({}) }
  return mockResponse
}

const setupFetchStub = () => stub().resolves(mockFetchResponse())

test.beforeEach(t => {
  const rds = new RemoteDataStore('url')
  const fetchStub = setupFetchStub()

  rds.fetch = fetchStub
  t.context.rds = rds
  t.context.fetchStub = fetchStub
})

test('RemoteDataStore function exists', t => {
  const { rds } = t.context
  t.true(typeof rds === 'object')
})

test('throws error if no url passed', t => {
  const error = t.throws(() => { RemoteDataStore() }, Error)
  t.is(error.message, 'No remote URL supplied.')
})

test('add method makes a POST request', t => {
  const { rds, fetchStub } = t.context
  fetchStub.resolves(new Response('{}', { status: 200 }))

  rds.add(null, 'test@test.com')

  t.true(fetchStub.calledOnce)
  t.true(fetchStub.calledWith('url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify('test@test.com')
  }))
})

test('get method makes a GET request and invokes callback', async t => {
  const { rds, fetchStub } = t.context
  const callback = fake()

  await rds.get('test@test.com', callback)

  t.true(fetchStub.calledOnce)
  t.true(fetchStub.calledWith('url/test@test.com'))
  t.true(callback.calledOnce)
  t.true(callback.calledWith({}))
})

test('get method makes a GET request and does not invoke callback', async t => {
  const { rds, fetchStub } = t.context

  await rds.get('test@test.com')

  t.true(fetchStub.calledOnce)
  t.true(fetchStub.calledWith('url/test@test.com'))
})

test('getAll method makes a GET request and invokes callback', async t => {
  const { rds, fetchStub } = t.context
  const callback = fake()

  await rds.getAll(callback)

  t.true(fetchStub.calledOnce)
  t.true(fetchStub.calledWith('url'))
  t.true(callback.calledOnce)
  t.true(callback.calledWith({}))
})

test('getAll method makes a GET request and does not invoke callback', async t => {
  const { rds, fetchStub } = t.context

  await rds.getAll()

  t.true(fetchStub.calledOnce)
  t.true(fetchStub.calledWith('url'))
})

test('remove method makes DELETE request', t => {
  const { rds, fetchStub } = t.context
  fetchStub.resolves(new Response('{}', { status: 200 }))

  rds.remove('test@test.com')

  t.true(fetchStub.calledOnce)
  t.true(fetchStub.calledWith('url/test@test.com', { method: 'DELETE' }))
})
