(function (exports, $) {
  function CheckList (selector) {
    if (!selector) {
      throw new Error('No selector provided.')
    }

    this.$element = $(selector)
    if (this.$element.length === 0) {
      throw new Error(`Could not find element with selector: ${selector}.`)
    }
  }

  CheckList.prototype.addClickHandler = function (callback) {
    this.$element.on('click', 'input', e => {
      const email = e.target.value
      callback(email).then(() => this.removeRow(email))
    })
  }

  CheckList.prototype.addRow = function (order) {
    this.removeRow(order.emailAddress)
    const rowElement = new Row(order)
    this.$element.append(rowElement.$element)
  }

  CheckList.prototype.removeRow = function (email) {
    this.$element
      .find(`[value="${email}"]`)
      .closest('[data-coffee-order="checkbox"]')
      .remove()
  }

  function Row (order) {
    const $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox'
    })

    const $label = $('<label></label>')

    const $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: order.emailAddress
    })

    const description = (
    `${order.size}
    ${order.flavor ? order.flavor : ' '}
    ${order.coffee},
    (${order.emailAddress})
    [${order.strength}]`
    )

    $label.append($checkbox)
    $label.append(description)
    $div.append($label)

    this.$element = $div
  }

  exports.CheckList = CheckList
})(typeof exports === 'undefined' ? window.app : exports, window.jQuery)
