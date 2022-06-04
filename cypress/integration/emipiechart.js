/// <reference types="cypress" />

function calculate(p, n, r) {
  if (p == 0) {
    return 0
  }
  else {
    var r_monthly = ((r/12) / 100)
    var n_monthly = n * 12
    var n_calculated = (1 + r_monthly) ** n_monthly
    return Math.round((p * r_monthly * n_calculated)/ (n_calculated - 1))
  }
}

describe('Assessment for StreamHub', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })

    beforeEach(() => {
      cy.visit('https://emicalculator.net')
    })

    it('Validate Input 1', () => {
      cy.get('li[id="home-loan"]').click()
      cy.get('input[name="loanamount"]').clear()
      cy.get('input[name="loanamount"]').type('2500000')
      cy.get('input[name="loaninterest"]').clear()
      cy.get('input[name="loaninterest"]').type('10')
      cy.get('input[name="loanterm"]').clear()
      cy.get('input[name="loanterm"]').type('10').type('{enter}')
      cy.get('#emiamount span').invoke('text').then(text => +text.replace(',', '').trim()).should('eq', calculate(2500000, 10, 10))
      cy.get('#emipiechart').should('be.visible')
      cy.get('g.highcharts-label:nth-child(1) > text:nth-child(1) > tspan').invoke('text').then(text => +text.replace('%', '').trim()).should('gt', 0)
      cy.get('g.highcharts-label:nth-child(2) > text:nth-child(1) > tspan:nth-child(1)').invoke('text').then(text => +text.replace('%', '').trim()).should('gt', 0)
    })

    it('Validate Input 2', () => {
      cy.get('li[id="home-loan"]').click()
      cy.get('input[name="loanamount"]').clear()
      cy.get('input[name="loanamount"]').type('5000000')
      cy.get('input[name="loaninterest"]').clear()
      cy.get('input[name="loaninterest"]').type('7.5')
      cy.get('input[name="loanterm"]').clear()
      cy.get('input[name="loanterm"]').type('15').type('{enter}')
      cy.get('#emiamount span').invoke('text').then(text => +text.replace(',', '').trim()).should('eq', calculate(5000000, 15, 7.5))
      cy.get('#emipiechart').should('be.visible')
      cy.get('g.highcharts-label:nth-child(1) > text:nth-child(1) > tspan').invoke('text').then(text => +text.replace('%', '').trim()).should('gt', 0)
      cy.get('g.highcharts-label:nth-child(2) > text:nth-child(1) > tspan:nth-child(1)').invoke('text').then(text => +text.replace('%', '').trim()).should('gt', 0)
    })

    it('Validate Input 3', () => {
      cy.get('li[id="home-loan"]').click()
      cy.get('input[name="loanamount"]').clear()
      cy.get('input[name="loanamount"]').type('0')
      cy.get('input[name="loaninterest"]').clear()
      cy.get('input[name="loaninterest"]').type('0')
      cy.get('input[name="loanterm"]').clear()
      cy.get('input[name="loanterm"]').type('0').type('{enter}')
      cy.get('#emiamount span').invoke('text').then(text => +text.replace(',', '').trim()).should('eq', calculate(0, 5, 1))
      cy.get('#emipiechart').should('be.visible')
      cy.get('g.highcharts-label:nth-child(1) > text:nth-child(1) > tspan').invoke('text').then(text => +text.replace('%', '').trim()).should('eq', 0)
      cy.get('g.highcharts-label:nth-child(2) > text:nth-child(1) > tspan:nth-child(1)').invoke('text').then(text => +text.replace('%', '').trim()).should('eq', 0)
    })
  })
  