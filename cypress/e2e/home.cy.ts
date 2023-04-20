describe('home page', () => {
  // it('the h1 contains the correct text', () => {
  //   cy.visit('https://localhost:4200')
  // })
  it('clicking "New user? Click to signup!!" navigates to a new url of the signup page', () => {
    cy.visit('http://localhost:4200')
    cy.contains('New user? Click to signup!!').click()
    //cy.get('#signup', { timeout: 10000 }).click()
    cy.url().should('include', '/signup')
  })
})