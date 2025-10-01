class SettingsPage {
  static visit() {
    cy.visit('/settings')
    cy.get('form').should('be.visible')
  }

  static updateUsername(username) {
    cy.get('input[placeholder="Username"]', { timeout: 10000 }).should('be.visible')
    cy.get('input[placeholder="Username"]').clear().type(username)
  }

  static updateBio(bio) {
    cy.get('textarea[placeholder="Short bio about you"]', { timeout: 10000 }).should('be.visible')
    cy.get('textarea[placeholder="Short bio about you"]').clear().type(bio)
  }

  static updateEmail(email) {
    cy.get('input[placeholder="Email"]', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
    cy.get('input[placeholder="Email"]').clear().type(email)
  }

  static updatePassword(password) {
    cy.get('input[placeholder="New Password"]', { timeout: 10000 }).should('be.visible')
    cy.get('input[placeholder="New Password"]').clear().type(password)
  }

  static submit() {
    cy.get('button[type="submit"]').click()
    cy.get('form').should('be.visible')
  }

  static logout() {
    cy.contains('Or click here to logout').click()
  }
}

export default SettingsPage
