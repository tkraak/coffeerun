(function (exports) {
  const form = '[data-coffee-order="form"]'
  const Truck = exports.app.Truck
  const DataStore = exports.app.DataStore
  const FormHandler = exports.app.FormHandler
  const truck = new Truck('ncc-1701', new DataStore())
  const formHandler = new FormHandler(form)

  formHandler.addSubmitHandler(truck.createOrder.bind(truck))

  exports.truck = truck
})(typeof exports === 'undefined' ? window : exports)
