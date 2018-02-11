(function (exports, $) {
  function RemoteDataStore (url) {
    if (!url) {
      throw new Error('No remote URL supplied.')
    }
    this.serverUrl = url
  }

  // match DataStore signature
  RemoteDataStore.prototype.add = function (k, v) {
    return $.post(this.serverUrl, v)
  }

  RemoteDataStore.prototype.get = function (k, cb) {
    return $.get(`${this.serverUrl}/${k}`, response => {
      if (cb) {
        cb(response)
      }
    })
  }

  RemoteDataStore.prototype.getAll = function (cb) {
    return $.get(this.serverUrl, response => {
      if (cb) {
        cb(response)
      }
    })
  }

  RemoteDataStore.prototype.remove = function (k) {
    return $.ajax(`${this.serverUrl}/${k}`, {
      type: 'DELETE'
    })
  }

  exports.RemoteDataStore = RemoteDataStore
})(typeof exports === 'undefined' ? window.app : exports, window.jQuery)
