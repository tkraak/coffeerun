(function (exports) {
  const { Validation, CheckList, DataStore, FormHandler, Truck } = exports.app
  const truck = new Truck('ncc-1701', new DataStore())
  const checkList = new CheckList('[data-coffee-order="checklist"]')
  const formHandler = new FormHandler('[data-coffee-order="form"]')

  checkList.addClickHandler(truck.deliverOrder.bind(truck))

  formHandler.addSubmitHandler((data) => {
    truck.createOrder(data)
    checkList.addRow(data)
  })

  formHandler.addInputHandler(Validation.isCompanyEmail)

  exports.truck = truck
})(typeof exports === 'undefined' ? window : exports)
