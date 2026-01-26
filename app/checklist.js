(function (exports) {
  function CheckList (selector) {
    if (!selector) {
      throw new Error('No selector provided.')
    }

    this.element = document.querySelector(selector)
    if (!this.element) {
      throw new Error(`Could not find element with selector: ${selector}.`)
    }
  }

  CheckList.prototype.addClickHandler = function (callback) {
    this.element.addEventListener('click', e => {
      if (!e.target.matches('input')) {
        return
      }
      const email = e.target.value
      callback(email).then(() => this.removeRow(email))
    })
  }

  CheckList.prototype.addRow = function (order) {
    this.removeRow(order.emailAddress)
    const rowElement = new Row(order)
    this.element.classList.remove('loader-bg')
    this.element.appendChild(rowElement.element)
  }

  CheckList.prototype.removeRow = function (email) {
    const checkbox = this.element.querySelector(`[value="${email}"]`)
    if (!checkbox) {
      return
    }
    const row = checkbox.closest('[data-coffee-order="checkbox"]')
    if (row) {
      row.remove()
    }
  }

  function Row (order) {
    const div = document.createElement('div')
    div.dataset.coffeeOrder = 'checkbox'
    div.classList.add('checkbox')

    const label = document.createElement('label')

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.value = order.emailAddress

    const description = (
      `${order.size}
      ${order.flavor ? order.flavor : ' '}
      ${order.coffee},
      (${order.emailAddress})
      [${order.strength}]`
    )

    label.appendChild(checkbox)
    // github.com/declandewet/common-tags#oneline
    label.append(description.replace(/(?:\n(?:\s*))+/g, ' '))
    div.appendChild(label)

    this.element = div
  }

  exports.CheckList = CheckList
})(typeof exports === 'undefined' ? window.app : exports)
