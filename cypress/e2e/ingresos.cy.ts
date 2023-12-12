describe('Pruebas e2e Cypress', () => {
    context('Resolucion Mobile', () => {
        beforeEach(() => {
            cy.viewport(425, 865)
        })

        it('Ingresar al login', () => {
            cy.visit('http://localhost:8100/')
        })

        it('Ingresar al registro', () => {
            cy.visit('http://localhost:8100/register')
        })

        it('404 Not Found', () => {
            cy.visit('http://localhost:8100/prueba')
        })
    })
})