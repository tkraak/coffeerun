(function (exports) {
  function DataStore () {
    this.data = {}
  }

  DataStore.prototype.add = function (k, v) {
    return new Promise((resolve, reject) => {
      this.data[k] = v
      resolve(null)
    })
  }

  DataStore.prototype.get = function (k) {
    return new Promise((resolve, reject) => {
      resolve(this.data[k])
    })
  }

  DataStore.prototype.getAll = function () {
    return new Promise((resolve, reject) => {
      resolve(this.data)
    })
  }

  DataStore.prototype.remove = function (k) {
    return new Promise((resolve, reject) => {
      delete this.data[k]
      resolve(null)
    })
  }

  exports.DataStore = DataStore
})(typeof exports === 'undefined' ? window.app : exports)
