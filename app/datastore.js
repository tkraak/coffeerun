(function (exports) {
  function DataStore () {
    this.data = {}
  }

  DataStore.prototype.add = function (k, v) {
    this.data[k] = v
  }

  DataStore.prototype.get = function (k) {
    return this.data[k]
  }

  DataStore.prototype.getAll = function () {
    return this.data
  }

  DataStore.prototype.remove = function (k) {
    delete this.data[k]
  }

  exports.DataStore = DataStore
})(typeof exports === 'undefined' ? window.app = {} : exports)
