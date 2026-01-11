(function (exports) {
  const { Validation, CheckList, DataStore, FormHandler, Truck } = exports.app
  const truck = new Truck('ncc-1701', new DataStore())
  const checkList = new CheckList('[data-coffee-order="checklist"]')
  const formHandler = new FormHandler('[data-coffee-order="form"]')

  checkList.addClickHandler(truck.deliverOrder.bind(truck))

  formHandler.addSubmitHandler((data) => {
    return truck.createOrder(data).then(() => checkList.addRow(data))
  })

  formHandler.addInputHandler(Validation.isCompanyEmail)

  truck.printOrders(checkList.addRow.bind(checkList))
})(typeof exports === 'undefined' ? window : exports)
