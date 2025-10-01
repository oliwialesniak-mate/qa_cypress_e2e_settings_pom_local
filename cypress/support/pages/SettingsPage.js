class SettingsPage {
  static visit() {
    cy.visit('/settings')
    cy.get('form').should('be.visible')
  }

  static updateUsername(username) {
    cy.get('input[placeholder="Username"]').should('be.visible')
    cy.get('input[placeholder="Username"]').clear()
    cy.get('input[placeholder="Username"]').type(username, { delay: 100 })
  }

  static updateBio(bio) {
    cy.get('textarea[placeholder="Short bio about you"]').should('be.visible')
    cy.get('textarea[placeholder="Short bio about you"]').clear()
    cy.get('textarea[placeholder="Short bio about you"]').type(bio, { delay: 50 })
  }

  static updateEmail(email) {
    cy.get('input[placeholder="Email"]').should('be.visible').and('not.be.disabled')
    cy.get('input[placeholder="Email"]').clear()
    cy.get('input[placeholder="Email"]').type(email, { delay: 50 })
  }

  static updatePassword(password) {
    cy.get('input[placeholder="New Password"]').should('be.visible')
    cy.get('input[placeholder="New Password"]').clear()
    cy.get('input[placeholder="New Password"]').type(password, { delay: 50 })
  }

  static submit() {
    cy.get('button[type="submit"]').click()
    // wait for form to settle back
    cy.get('form').should('be.visible')
  }

  static logout() {
    cy.contains('Or click here to logout').click()
  }
}

export default SettingsPage
