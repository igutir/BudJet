describe('Pruebas e2e Cypress', () => {

  it('Ingresar al login', () => {
    cy.visit('http://localhost:8100/')
  })

  it('Ingresar al registro', () => {
    cy.visit('http://localhost:8100/register')
  })

  it('Ingresar al home', () => {
    cy.visit('http://localhost:8100/home')
  })

})