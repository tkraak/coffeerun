(function (exports) {
  function Truck (truckId, db) {
    this.truckId = truckId
    this.db = db
  }

  Truck.prototype.createOrder = function (order) {
    this.db.add(order.emailAddress, order)
  }

  Truck.prototype.deliverOrder = function (id) {
    this.db.remove(id)
  }

  Truck.prototype.printOrders = function () {
    const customers = Object.keys(this.db.getAll())

    customers.forEach(id => {
      console.log(this.db.get(id))
    })
  }

  exports.Truck = Truck
})(typeof exports === 'undefined' ? window.app : exports)
