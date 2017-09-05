(function (exports) {
  const $ = window.jQuery

  function FormHandler (selector) {
    if (!selector) {
      throw new Error('No selector provided!')
    }

    this.$formElement = $(selector)
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector:', selector)
    }
  }

  FormHandler.prototype.addSubmitHandler = function (fn) {
    this.$formElement.on('submit', function (e) {
      e.preventDefault()
      const data = {}
      $(this).serializeArray().forEach((field) => {
        data[field.name] = field.value
      })
      console.log(data)
      fn(data)
      this.reset()
      this.elements[1].focus()
    })
  }

  exports.FormHandler = FormHandler
})(typeof exports === 'undefined' ? window.app = {} : exports)
