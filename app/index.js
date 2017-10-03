(function (exports) {
  const { CheckList, DataStore, FormHandler, Truck } = exports.app
  const truck = new Truck('ncc-1701', new DataStore())
  const checkList = new CheckList('[data-coffee-order="checklist"]')
  const formHandler = new FormHandler('[data-coffee-order="form"]')

  formHandler.addSubmitHandler((data) => {
    truck.createOrder(data)
    checkList.addRow(data)
  })

  exports.truck = truck
})(typeof exports === 'undefined' ? window : exports)
