/// <reference types="cypress" />

import SettingsPage from '../support/pages/SettingsPage'

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('clearDb') // ✅ ensure DB is reset
    cy.registerAndLogin()
    cy.visit('/settings')
    cy.url().should('include', '/settings')
    cy.get('form').should('be.visible')
  })

  it('should provide an ability to update username', () => {
    const newUsername = 'user_' + Date.now()
    cy.get('form input[type="text"]').first().as('usernameField')

    cy.get('@usernameField').clear().type(newUsername)
    SettingsPage.submit()

    cy.get('@usernameField').should('have.value', newUsername)
  })

  it('should provide an ability to update bio', () => {
    const newBio = 'This is my new bio'

    cy.get('form textarea').first().as('bioField')
    cy.get('@bioField').clear().type(newBio)

    SettingsPage.submit()

    cy.get('@bioField').should('have.value', newBio)
  })

  it('should provide an ability to update an email', () => {
    const newEmail = `test_${Date.now()}@mail.com`

    cy.get('form input[type="email"]').as('emailField')
    cy.get('@emailField').should('not.be.disabled')
    cy.get('@emailField').clear().type(newEmail)

    SettingsPage.submit()

    cy.get('@emailField').should('have.value', newEmail)
  })

  it('should provide an ability to update password', () => {
    const newPassword = 'NewPass123!'

    cy.get('form input[type="password"]').as('passwordField')
    cy.get('@passwordField').clear().type(newPassword)

    SettingsPage.submit()

    // no visible change possible, but check request was sent
    cy.intercept('PUT', '/api/user').as('updateUser')
    cy.wait('@updateUser').its('response.statusCode').should('eq', 200)
  })

  it('should provide an ability to log out', () => {
    SettingsPage.logout()
    cy.url().should('include', '/login')
  })
})
