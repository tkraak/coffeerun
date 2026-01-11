(function (exports) {
  const Validation = {
    isCompanyEmail (email) {
      return /.+@(test\.com|coffeerun\.com)$/.test(email)
    }
  }

  exports.Validation = Validation
})(typeof exports === 'undefined' ? window.app = {} : exports)
