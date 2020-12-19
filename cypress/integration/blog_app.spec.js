/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Testguy McTesterson',
      username: 'ttester',
      password: 'hurrdurr'
    }
    const user2 = {
      name: 'Testguy McTesterson2',
      username: 'ttester2',
      password: 'hurrdurr2'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')  
  })    


  describe('Login', function() {
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
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'ttester', password: 'hurrdurr' })      })

      it('A blog can be created and liked', function() {
        cy.get('#new-blog').click()     
        cy.get('#title').type('Test Blog Title by Cyprus')
        cy.get('#author').type('Test Blog Author by Cyprus')
        cy.get('#url').type('Test Blog url by Cyprus')
        cy.contains('create').click()
        cy.contains('Test Blog Title by Cyprus')
        cy.get('#view').click()
        cy.get('#like').click()
        cy.get('html').should('contain', 'likes: 1')
      })
      it('A blog can be deleted by the person who created it', function() {
        cy.get('#new-blog').click()     
        cy.get('#title').type('Test Blog Title by Cyprus')
        cy.get('#author').type('Test Blog Author by Cyprus')
        cy.get('#url').type('Test Blog url by Cyprus')
        cy.contains('create').click()
        cy.contains('Test Blog Title by Cyprus')
        cy.get('#view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'view')

      })
      it('A blog cannot be deleted by the person who did not create it', function() {
        cy.get('#new-blog').click()     
        cy.get('#title').type('Test Blog Title by Cyprus')
        cy.get('#author').type('Test Blog Author by Cyprus')
        cy.get('#url').type('Test Blog url by Cyprus')
        cy.contains('create').click()
        cy.contains('Test Blog Title by Cyprus')
        cy.get('#logout').click()
        cy.get('#username').type('ttester2')
        cy.get('#password').type('hurrdurr2')
        cy.get('#login-button').click()    
        cy.contains('Testguy McTesterson2 logged-in')
        cy.get('#view').click()
        cy.get('html').should('not.contain', 'remove')      
      })
      it('Blogs are listed by order of likes', function() {
        cy.get('#new-blog').click()     
        cy.get('#title').type('Test Blog Title by Cyprus')
        cy.get('#author').type('Test Blog Author by Cyprus')
        cy.get('#url').type('Test Blog url by Cyprus')
        cy.contains('create').click()
        cy.get('#view').click()
        cy.get('#like').click()
        cy.get('#new-blog').click()     
        cy.get('#title').type('Test Blog Title by Cyprus2')
        cy.get('#author').type('Test Blog Author by Cyprus2')
        cy.get('#url').type('Test Blog url by Cyprus2')
        cy.contains('create').click()
        cy.get('#hide').click()
        cy.wait(5500)
        cy.contains('Cyprus2')
          .contains('view').click()
          .get('#like').click()
          .wait(500)
          .get('#like').click()
          .get('#hide').click()
          .wait(200)
        cy.get('.blog').first()
          .contains('view').click()
        cy.contains('likes: 2')
      })
    })  
  }) 

