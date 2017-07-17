(function (exports) {
  const Truck = exports.app.Truck
  const DataStore = exports.app.DataStore
  const truck = new Truck('ncc-1701', new DataStore())
  exports.truck = truck
})(typeof exports === 'undefined' ? window : exports)
