import test from 'ava'
import { fake, spy, stub } from 'sinon'
import window from './helpers/window'

global.window = window
const { $ } = window
const { RemoteDataStore } = require('../app/remotedatastore')
const rds = new RemoteDataStore('url')

test('RemoteDataStore function exists', t => {
  t.true(typeof rds === 'object')
})

test('throws error if no url passed', t => {
  const error = t.throws(() => { RemoteDataStore() }, Error)
  t.is(error.message, 'No remote URL supplied.')
})

test('add method makes a POST request', t => {
  spy($, 'post')
  rds.add(null, 'test@test.com')
  t.true($.post.calledOnce)
  t.true($.post.calledWith('url', 'test@test.com'))
})

test('get method makes a GET request and invokes callback', t => {
  const callback = fake()
  const get = stub($, 'get').yields({})
  rds.get('test@test.com', callback)
  t.true(get.calledOnce)
  t.true(get.calledWithMatch('url/test@test.com'))
  t.true(callback.calledOnce)
  t.true(callback.calledWith({}))
  get.restore()
})

test('get method makes a GET request and does not invoke callback', t => {
  const callback = fake()
  const get = stub($, 'get').yields({})
  rds.get('test@test.com')
  t.true(get.calledOnce)
  t.true(get.calledWithMatch('url/test@test.com'))
  t.false(callback.called)
  get.restore()
})

test('getAll method makes a GET request and invokes callback', t => {
  const callback = fake()
  const get = stub($, 'get').yields({})
  rds.getAll(callback)
  t.true(get.calledOnce)
  t.true(get.calledWithMatch('url'))
  t.true(callback.calledOnce)
  t.true(callback.calledWith({}))
  get.restore()
})

test('getAll method makes a GET request and does not invoke callback', t => {
  const callback = fake()
  const get = stub($, 'get').yields({})
  rds.getAll()
  t.true(get.calledOnce)
  t.true(get.calledWithMatch('url'))
  t.false(callback.called)
  get.restore()
})

test('remove method makes DELETE request', t => {
  spy($, 'ajax')
  rds.remove('test@test.com')
  t.true($.ajax.calledOnce)
  t.true($.ajax.calledWith('url/test@test.com', { type: 'DELETE' }))
})
