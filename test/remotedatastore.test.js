import test from 'ava'
import sinon from 'sinon'
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
  sinon.spy($, 'post')
  rds.add(null, 'test@test.com')
  t.true($.post.calledOnce)
  t.true($.post.calledWith('url', 'test@test.com'))
  $.post.restore()
})

test('get method makes a GET request and invokes callback', t => {
  const cb = sinon.spy()
  const get = sinon.stub($, 'get').yields({})
  rds.get('test@test.com', cb)
  t.true(get.calledOnce)
  t.true(get.calledWithMatch('url/test@test.com'))
  t.true(cb.calledOnce)
  t.true(cb.calledWith({}))
  $.get.restore()
})

test('get method makes a GET request and does not invoke callback', t => {
  const cb = sinon.spy()
  const get = sinon.stub($, 'get').yields({})
  rds.get('test@test.com')
  t.true(get.calledOnce)
  t.true(get.calledWithMatch('url/test@test.com'))
  t.false(cb.called)
  $.get.restore()
})

test('getAll method makes a GET request and invokes callback', t => {
  const cb = sinon.spy()
  const get = sinon.stub($, 'get').yields({})
  rds.getAll(cb)
  t.true(get.calledOnce)
  t.true(get.calledWithMatch('url'))
  t.true(cb.calledOnce)
  t.true(cb.calledWith({}))
  $.get.restore()
})

test('getAll method makes a GET request and does not invoke callback', t => {
  const cb = sinon.spy()
  const get = sinon.stub($, 'get').yields({})
  rds.getAll()
  t.true(get.calledOnce)
  t.true(get.calledWithMatch('url'))
  t.false(cb.called)
  $.get.restore()
})

test('remove method makes DELETE request', t => {
  sinon.spy($, 'ajax')
  rds.remove('test@test.com')
  t.true($.ajax.calledOnce)
  t.true($.ajax.calledWith('url/test@test.com', { type: 'DELETE' }))
  $.ajax.restore()
})
