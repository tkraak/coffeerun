/**
 * Sort of a minimalist jQuery, mainly for demonstration purposes.
 * MIT @ gist.github.com/m3g4p0p/bc4e6805aa13c3fe3fa7f62804cef00e
 */

(function (exports) {
  /**
   * Map elements to events
   * @type {WeakMap}
   */
  const eventMap = new WeakMap()

  /**
   * The methods in the collection's prototype
   * @type {Object}
   */
  const prototype = {

    /**
     * Check if a node is already contained in the collection
     * @param  {HTMLElement} element
     * @return {Boolean}
     */
    has (element) {
      return Array.from(this).includes(element)
    },

    /**
     * Add an element or a list of elements to the collection
     * @param   {mixed} element
     * @returns {this}
     */
    add (element) {
      const elements = element.length !== undefined ? element : [element]

      Array.from(elements).forEach(element => {
        if (element && !this.has(element)) {
          Array.prototype.push.call(this, element)
        }
      })

      return this
    },

    /**
     * Find descendants of the current collection matching a selector
     * @param  {String} selector
     * @return {this}
     */
    find (selector) {
      return Array.from(this).reduce(
        (carry, element) => carry.add(element.querySelectorAll(selector)),
        Object.create(prototype)
      )
    },

    /**
     * Add a class to all elements in the current collection
     * @param   {String} className
     * @returns {this}
     */
    addClass (className) {
      Array.from(this).forEach(el => {
        el.classList.add(className)
      })

      return this
    },

    /**
     * Remove a class from all elements in the current collection
     * @param  {String} className
     * @return {this}
     */
    removeClass (className) {
      Array.from(this).forEach(el => {
        el.classList.remove(className)
      })

      return this
    },

    /**
     * Bind event listeners to all elements in the current collection,
     * optionally delegated to a target element specified as 2nd argument
     * @param  {String} type
     * @param  {Function|String} target
     * @param  {Function|undefined} callback
     * @return {this}
     */
    on (type, target, callback) {
      const handler = callback
        ? function (event) {
          if (event.target.matches(target)) {
            callback.call(this, event)
          }
        }
        : target

      Array.from(this).forEach(element => {
        const events = eventMap.get(element) || eventMap.set(element, {}).get(element)

        events[type] = events[type] || []
        events[type].push(handler)
        element.addEventListener(type, handler)
      })

      return this
    }
  }

  /**
   * Create a new collection
   * @param  {String} selector
   * @param  {HTMLElement|undefined} context
   * @return {Object}
   */
  function createCollection (selector, context = document) {
    const initial = typeof selector === 'string'
      ? context.querySelectorAll(selector)
      : selector

    const instance = Object.create(prototype)

    return initial
      ? instance.add(initial)
      : instance
  }

  exports.$ = createCollection
})(typeof exports === 'undefined' ? window : exports)
