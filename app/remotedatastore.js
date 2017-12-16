(function (exports, $) {
  function RemoteDataStore (url) {
    if (!url) {
      throw new Error('No remote URL supplied.')
    }
    this.serverUrl = url
  }

  // match DataStore signature
  RemoteDataStore.prototype.add = function (k, v) {
    $.post(this.serverUrl, v)
  }

  RemoteDataStore.prototype.get = function (k, cb) {
    $.get(`${this.serverUrl}/${k}`, response => cb(response))
  }

  RemoteDataStore.prototype.getAll = function (cb) {
    $.get(this.serverUrl, response => cb(response))
  }

  RemoteDataStore.prototype.remove = function (k) {
    $.ajax(`${this.serverUrl}/${k}`, {
      type: 'DELETE'
    })
  }

  exports.RemoteDataStore = RemoteDataStore
})(typeof exports === 'undefined' ? window.app : exports, window.jQuery)
