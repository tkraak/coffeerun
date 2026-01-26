(function (exports) {
  function RemoteDataStore (url) {
    if (!url) {
      throw new Error('No remote URL supplied.')
    }
    this.serverUrl = url
    this.fetch = fetch
  }

  // match DataStore signature
  RemoteDataStore.prototype.add = function (_k, v) {
    return this.fetch(this.serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(v)
    })
  }

  RemoteDataStore.prototype.get = function (k, cb) {
    return this.fetch(`${this.serverUrl}/${k}`)
      .then(response => response.json())
      .then(data => {
        if (cb) {
          cb(data)
        }
        return data
      })
  }

  RemoteDataStore.prototype.getAll = function (cb) {
    return this.fetch(this.serverUrl)
      .then(response => response.json())
      .then(data => {
        if (cb) {
          cb(data)
        }
        return data
      })
  }

  RemoteDataStore.prototype.remove = function (k) {
    return this.fetch(`${this.serverUrl}/${k}`, {
      method: 'DELETE'
    })
  }

  exports.RemoteDataStore = RemoteDataStore
})(typeof exports === 'undefined' ? window.app : exports)
