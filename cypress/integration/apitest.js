/// <reference types="cypress" />


describe('Assessment for StreamHub', () => {
    it('Pre-requisite', () => {
      cy.request('GET', 'https://reqres.in/api/users?page=2').then(response => {
          cy.writeFile('cypress/fixtures/apidata.json', response.body.data)
      })
    })
    it('Validation of API Request', () => {
      cy.request('GET', 'https://reqres.in/api/users?page=2').its('status').should('equal', 200)
      cy.request('GET', 'https://reqres.in/api/users?page=2').its('body').then((body) => {
        cy.fixture('apidata.json').should('deep.equal', body.data)
      })
    })
})