(function (exports) {
  function Truck (truckId, db) {
    this.truckId = truckId
    this.db = db
  }

  Truck.prototype.createOrder = function (order) {
    this.db.add(order.emailAddress, order)
  }

  exports.Truck = Truck
})(typeof exports === 'undefined' ? window.app : exports)
