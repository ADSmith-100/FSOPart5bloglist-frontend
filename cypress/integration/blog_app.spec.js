/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Testguy McTesterson',
      username: 'ttester',
      password: 'hurrdurr'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')  
})


describe.only('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('ttester')
      cy.get('#password').type('hurrdurr')
      cy.get('#login-button').click()    

      cy.contains('Testguy McTesterson logged-in')
})
    it('fails with wrong credentials', function() {
      cy.get('#username').type('ttester')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()    

       cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(136, 1, 1)')
      .and('have.css', 'border-style', 'solid')
    
        cy.get('html').should('not.contain', 'Testguy McTesterson logged-in')
    })
  })
})

