/// <reference types="cypress" />

import SettingsPage from '../support/pages/SettingsPage'

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear')
    cy.registerAndLogin()
    SettingsPage.visit()
  })

  it('should provide an ability to update username', () => {
    const newName = 'user_' + Date.now()
    SettingsPage.updateUsername(newName)
    cy.contains(newName).should('exist')
  })

  it('should provide an ability to update bio', () => {
    const newBio = 'This is my new bio'
    SettingsPage.updateBio(newBio)
    cy.contains(newBio).should('exist')
  })

  it('should provide an ability to update an email', () => {
    const newEmail = `updated_${Date.now()}@mail.com`
    SettingsPage.updateEmail(newEmail)
    cy.get('input[placeholder="Email"]').should('have.value', newEmail)
  })

  it('should provide an ability to update password', () => {
    const newPass = 'NewPass123!'
    SettingsPage.updatePassword(newPass)
    // After password update, user can log out and back in
    SettingsPage.logout()
    cy.visit('/login')
    cy.get('input[type="email"]').type(Cypress.env('currentEmail'))
    cy.get('input[type="password"]').type(newPass)
    cy.get('button').contains('Sign in').click()
    cy.contains('Your Feed').should('exist')
  })

  it('should provide an ability to log out', () => {
    SettingsPage.logout()
    cy.url().should('match', /\/($|login)/)   // passes for "/" or "/login"
  })
})
