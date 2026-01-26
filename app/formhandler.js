(function (exports) {
  function FormHandler (selector) {
    if (!selector) {
      throw new Error('No selector provided.')
    }

    this.formElement = document.querySelector(selector)
    if (!this.formElement) {
      throw new Error(`Could not find element with selector: ${selector}.`)
    }
  }

  FormHandler.prototype.addSubmitHandler = function (callback) {
    this.formElement.addEventListener('submit', function (e) {
      e.preventDefault()
      const data = {}
      const formData = new FormData(this)
      formData.forEach((value, name) => {
        data[name] = value
      })
      callback(data).then(() => {
        this.reset()
        this.elements[1].focus()
      })
    })
  }

  FormHandler.prototype.addInputHandler = function (callback) {
    this.formElement.addEventListener('input', function (e) {
      if (!e.target.matches('[name="emailAddress"]')) {
        return
      }
      const emailAddress = e.target.value
      let message = ''
      if (callback(emailAddress)) {
        e.target.setCustomValidity('')
      } else {
        message = `${emailAddress} is not an authorized email address!`
        e.target.setCustomValidity(message)
      }
    })
  }

  exports.FormHandler = FormHandler
})(typeof exports === 'undefined' ? window.app : exports)
