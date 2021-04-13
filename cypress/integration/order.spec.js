describe('place and fulfill coffee order', () => {
  before(() => {
    cy.visit('http://localhost:8080')
  })

  specify('name', () => {
    cy.get('[name="coffee"]')
      .type('test order').should('have.value', 'test order')
  })

  specify('email address', () => {
    cy.get('[name="emailAddress"]')
      .type('test@email.com').should('have.value', 'test@email.com')
  })

  specify('size', () => {
    cy.get('[type="radio"]')
      .check('short').should('be.checked')
  })

  specify('flavor', () => {
    cy.get('#flavor')
      .select('caramel')
  })

  specify('strength', () => {
    cy.get('#strength')
      .invoke('val', 60)
      .trigger('change')
  })

  specify('submit', () => {
    cy.get('form').submit()
  })

  specify('order created', () => {
    cy.get('[data-coffee-order="checkbox"] [value="test@email.com"]')
      .parent()
      .should('have.text', 'short caramel test order, (test@email.com) [60]')
  })

  specify('order fulfilled', () => {
    cy.get('[data-coffee-order="checkbox"] [value="test@email.com"]')
      .check()
      .should('not.exist')
  })
})
