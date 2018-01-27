import test from 'ava'
import sinon from 'sinon'
import { JSDOM } from 'jsdom'

const dom = new JSDOM(`<!DOCTYPE html><html><form data-coffee-order="form"></form></html>`)
const window = dom.window
const $ = require('jquery')(window) // eslint-disable-line no-unused-vars
global.window = window
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

test('get method makes a GET request', t => {
  sinon.spy($, 'get')
  rds.get('test@test.com', sinon.spy())
  t.true($.get.calledOnce)
  t.true($.get.calledWithMatch('url/test@test.com'))
  $.get.restore()
})

test('getAll method makes a GET request', t => {
  sinon.spy($, 'get')
  rds.getAll(sinon.spy())
  t.true($.get.calledOnce)
  t.true($.get.calledWithMatch('url'))
  $.get.restore()
})

test('remove method makes DELETE request', t => {
  sinon.spy($, 'ajax')
  rds.remove('test@test.com')
  t.true($.ajax.calledOnce)
  t.true($.ajax.calledWith('url/test@test.com', { type: 'DELETE' }))
  $.ajax.restore()
})
