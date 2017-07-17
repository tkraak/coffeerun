import test from 'ava'
import DataStore from '../app/datastore'

test('DataStore function exists', t => {
  const ds = new DataStore.DataStore()
  t.true(typeof ds === 'object')
})

test('DataStore has an add method', t => {
  const ds = new DataStore.DataStore()
  t.true(typeof ds.add === 'function')
})

test('the DataStore add method adds properties to the data object', t => {
  const ds = new DataStore.DataStore()
  ds.add('email', 'test@test.com')
  t.is(ds.data.email, 'test@test.com')
})
