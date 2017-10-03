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

  CheckList.prototype.addRow = function (coffeeOrder) {
    const rowElement = new Row(coffeeOrder)
    this.$element.append(rowElement.$element)
  }

  function Row (coffeeOrder) {
    const $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox'
    })

    const $label = $('<label></label>')

    const $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress
    })

    const description = (
    `${coffeeOrder.size}
    ${coffeeOrder.flavor ? coffeeOrder.flavor : ' '}
    ${coffeeOrder.coffee},
    (${coffeeOrder.emailAddress})
    [${coffeeOrder.strength}]`
    )

    $label.append($checkbox)
    $label.append(description)
    $div.append($label)

    this.$element = $div
  }

  exports.CheckList = CheckList
})(typeof exports === 'undefined' ? window.app = {} : exports, window.jQuery)
