import test from 'ava'
import sinon from 'sinon'
import DataStore from '../app/datastore'
import Truck from '../app/truck'

const truck = new Truck.Truck('ncc-1701', new DataStore.DataStore())

test('Truck function exists', t => {
  t.true(typeof truck === 'object')
})

test('the instance truckId string exists', t => {
  t.true(typeof truck.truckId === 'string')
  t.is(truck.truckId, 'ncc-1701')
})

test('the instance db object exists', t => {
  t.true(typeof truck.db === 'object')
  t.true(truck.db instanceof DataStore.DataStore)
})

test('Truck has a createOrder method', t => {
  t.true(typeof truck.createOrder === 'function')
})

test('the createOrder method was called', t => {
  sinon.spy(truck, 'createOrder')
  truck.createOrder({ emailAddress: 'test@test.com', coffee: 'test' })
  t.true(truck.createOrder.called)
})

test('Truck has a deliverOrder method', t => {
  t.true(typeof truck.deliverOrder === 'function')
})

test('the deliverOrder method was called', t => {
  sinon.spy(truck, 'deliverOrder')
  truck.deliverOrder('test@test.com')
  t.true(truck.deliverOrder.called)
})

test('Truck has a printOrders method', t => {
  t.true(typeof truck.printOrders === 'function')
})

test('the printOrders method was called', t => {
  sinon.spy(truck, 'printOrders')
  truck.printOrders()
  t.true(truck.printOrders.called)
})
