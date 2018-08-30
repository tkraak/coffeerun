import { JSDOM } from 'jsdom'
import $ from 'jquery'

const { window } = new JSDOM(`
  <!DOCTYPE html>
    <html>
      <form data-coffee-order="form"></form>
      <div data-coffee-order="checklist"></div>
    </html>
`)
$(window)

export default window
