import test from 'ava'
import sinon from 'sinon'
import { DataStore } from '../app/datastore'
import { Truck } from '../app/truck'

const truck = new Truck('ncc-1701', new DataStore())

const orders = {
  emailAddress: 'test@test.com',
  coffee: 'test'
}

test('Truck function exists', t => {
  t.true(typeof truck === 'object')
})

test('the instance truckId string exists', t => {
  t.true(typeof truck.truckId === 'string')
  t.is(truck.truckId, 'ncc-1701')
})

test('the instance db object exists', t => {
  t.true(typeof truck.db === 'object')
  t.true(truck.db instanceof DataStore)
})

test('Truck has a createOrder method', t => {
  t.true(typeof truck.createOrder === 'function')
})

test('the createOrder method was called', t => {
  sinon.spy(truck.db, 'add')
  truck.createOrder({ emailAddress: 'test@test.com', coffee: 'test' })
  t.true(truck.db.add.called)
})

test('Truck has a deliverOrder method', t => {
  t.true(typeof truck.deliverOrder === 'function')
})

test('the deliverOrder method was called', t => {
  sinon.spy(truck.db, 'remove')
  truck.deliverOrder('test@test.com')
  t.true(truck.db.remove.called)
})

test('Truck has a printOrders method', t => {
  t.true(typeof truck.printOrders === 'function')
})

test('the printOrders method was called and invokes callback', t => {
  const cb = sinon.stub()
  sinon.stub(truck.db, 'getAll').returns({ then: sinon.stub().yields(orders) })
  truck.printOrders(cb)
  t.true(truck.db.getAll.called)
  t.true(cb.called)
  truck.db.getAll.restore()
})

test('the printOrders method was called and does not invoke callback', t => {
  const cb = sinon.stub()
  sinon.stub(truck.db, 'getAll').returns({ then: sinon.stub().yields(orders) })
  truck.printOrders()
  t.true(truck.db.getAll.called)
  t.false(cb.called)
})
