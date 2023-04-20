describe('memory game', () => {
  it('timer starts with 1:00', () => {
    cy.visit('http://localhost:4200/#/game2')
    cy.get('.timer').contains("1:00")
  })
  it('clicking "Return" button navigates to the game page', () => {
    cy.visit('http://localhost:4200/#/game1')
    cy.contains('Return').click()
    cy.url().should('include', '/notifications')
  })
})
describe('math game', () => {
  it('current score starts with 0', () => {
    cy.visit('http://localhost:4200/#/game2')
    cy.get('.correct-count').contains("0")
  })
  it('clicking "Return" button navigates to the game page', () => {
    cy.visit('http://localhost:4200/#/game2')
    cy.contains('Return').click()
    cy.url().should('include', '/notifications')
  })
})
describe('wordsearch game', () => {
  it('timer starts with 1:00', () => {
    cy.visit('http://localhost:4200/#/game2')
    cy.get('.timer').contains("1:00")
  })
  it('clicking "Return" button navigates to the game page', () => {
    cy.visit('http://localhost:4200/#/game3')
    cy.contains('Return').click()
    cy.url().should('include', '/notifications')
  })
})
describe('picture fame', () => {
  it('current score starts with 0', () => {
    cy.visit('http://localhost:4200/#/game2')
    cy.get('.correct-count').contains("0")
  })
  it('clicking "Return" button navigates to the game page', () => {
    cy.visit('http://localhost:4200/#/game4')
    cy.contains('Return').click()
    cy.url().should('include', '/notifications')
  })
})