(function (exports) {
  const Validation = {
    isCompanyEmail (email) {
      return /.+@test\.com$/.test(email)
    }
  }

  exports.Validation = Validation
})(typeof exports === 'undefined' ? window.app = {} : exports)
