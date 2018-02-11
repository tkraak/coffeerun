(function (exports) {
  function Truck (truckId, db) {
    this.truckId = truckId
    this.db = db
  }

  Truck.prototype.createOrder = function (order) {
    return this.db.add(order.emailAddress, order)
  }

  Truck.prototype.deliverOrder = function (id) {
    return this.db.remove(id)
  }

  Truck.prototype.printOrders = function (cb) {
    return this.db.getAll().then(orders => {
      const customers = Object.keys(orders)
      customers.forEach(id => {
        if (cb) {
          cb(orders[id])
        }
      })
    })
  }

  exports.Truck = Truck
})(typeof exports === 'undefined' ? window.app : exports)
