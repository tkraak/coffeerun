import test from 'ava'
import { DataStore } from '../app/datastore'

const ds = new DataStore()

test('DataStore function exists', t => {
  t.true(typeof ds === 'object')
})

test('the instance data object exists', t => {
  t.true(typeof ds.data === 'object')
  t.deepEqual(ds.data, {})
})

test('DataStore has an add method', t => {
  t.true(typeof ds.add === 'function')
})

test('the DataStore add method adds properties to the data object', t => {
  const ds = new DataStore()
  ds.add('email', 'test@test.com')
  t.is(ds.data.email, 'test@test.com')
})

test('DataStore has a get method', t => {
  t.true(typeof ds.get === 'function')
})

test('the DataStore get method returns a value for a given key', async t => {
  const ds = new DataStore()
  ds.add('email', 'test@test.com')
  t.is(await ds.get('email'), 'test@test.com')
})

test('DataStore has a getAll method', t => {
  t.true(typeof ds.getAll === 'function')
})

test('the DataStore getAll method returns the data object ', async t => {
  const ds = new DataStore()
  ds.add('email', 'test@test.com')
  t.deepEqual(await ds.getAll(), { email: 'test@test.com' })
})

test('DataStore has a remove method', t => {
  t.true(typeof ds.get === 'function')
})

test('the DataStore remove method deletes a property for a given key', t => {
  const ds = new DataStore()
  ds.add('email', 'test@test.com')
  ds.remove('email')
  t.deepEqual(ds.data, {})
})
