(function (exports) {
  const { Validation, CheckList, RemoteDataStore, FormHandler, Truck } = exports.app
  const apiUrl = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders'
  const truck = new Truck('ncc-1701', new RemoteDataStore(apiUrl))
  const checkList = new CheckList('[data-coffee-order="checklist"]')
  const formHandler = new FormHandler('[data-coffee-order="form"]')

  checkList.addClickHandler(truck.deliverOrder.bind(truck))

  formHandler.addSubmitHandler((data) => {
    return truck.createOrder(data).then(() => checkList.addRow(data))
  })

  formHandler.addInputHandler(Validation.isCompanyEmail)

  truck.printOrders(checkList.addRow.bind(checkList))

  exports.truck = truck
})(typeof exports === 'undefined' ? window : exports)
