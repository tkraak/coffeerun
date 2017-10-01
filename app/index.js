(function (exports) {
  const form = '[data-coffee-order="form"]'
  const cl = '[data-coffee-order="checklist"]'
  const Truck = exports.app.Truck
  const DataStore = exports.app.DataStore
  const FormHandler = exports.app.FormHandler
  const CheckList = exports.app.CheckList
  const truck = new Truck('ncc-1701', new DataStore())
  const checkList = new CheckList(cl)
  const formHandler = new FormHandler(form)

  formHandler.addSubmitHandler((data) => {
    truck.createOrder.call(truck, data)
    checkList.addRow.call(checkList, data)
  })

  exports.truck = truck
})(typeof exports === 'undefined' ? window : exports)
