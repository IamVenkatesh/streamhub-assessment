/// <reference types="cypress" />


describe('Assessment for StreamHub', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })

    beforeEach(() => {
      cy.visit('https://emicalculator.net')
    })

    it('Validate Input 1', () => {
      cy.get('li[id="personal-loan"]').click()
      cy.get('div #loanamountslider span').invoke("attr", "style", "left: 66.6666%").click()
      cy.get('div #loanamountslider div').invoke("attr", "style", "width: 66.6666%").click()
      cy.get('div #loaninterestslider span').invoke("attr", "style", "left: 70%").click()
      cy.get('div #loaninterestslider div').invoke("attr", "style", "width: 70%").click()
      cy.get('div #loantermslider span').invoke("attr", "style", "left: 200%").click()
      cy.get('div #loantermslider div').invoke("attr", "style", "width: 200%").click()
      cy.get('input[id="startmonthyear"]').click()
      cy.get('span.month:nth-child(7)').click()
      cy.get('#emibarchart').should('be.visible')
      cy.get('g.highcharts-series:nth-child(3)').children().its('length')
      cy.get('g.highcharts-series-group:nth-child(12) > g:nth-child(1) > rect:nth-child(1)').trigger('mousehover')
      //Need to work on getting the tooltip info
    })
})