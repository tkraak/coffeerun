(function (exports) {
  function Truck (truckId, db) {
    this.truckId = truckId
    this.db = db
  }

  Truck.prototype.createOrder = function (order) {
    console.log(`adding order for ${order.emailAddress}`)
    this.db.add(order.emailAddress, order)
  }

  Truck.prototype.deliverOrder = function (id) {
    console.log(`delivering order for ${id}`)
    this.db.remove(id)
  }

  Truck.prototype.printOrders = function () {
    const customers = Object.keys(this.db.getAll())

    console.log(`truck # ${this.truckId} has pending orders:`)
    customers.forEach(id => {
      console.log(this.db.get(id))
    })
  }

  exports.Truck = Truck
})(typeof exports === 'undefined' ? window.app : exports)
