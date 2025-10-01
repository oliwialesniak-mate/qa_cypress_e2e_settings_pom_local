/// <reference types="cypress" />

import { faker } from '@faker-js/faker'

/**
 * Get element by `data-cy` attribute.
 */
Cypress.Commands.add('getByDataCy', (selector) => {
  return cy.get(`[data-cy="${selector}"]`)
})

/**
 * Register a new user via API.
 */
Cypress.Commands.add(
  'register',
  (
    email = faker.internet.email(),
    username = faker.internet.userName(),
    password = '12345Qwert!'
  ) => {
    return cy
      .request('POST', '/api/users', {
        user: { email, username, password },
      })
      .then((response) => response.body.user)
  }
)

/**
 * Log in an existing user via API.
 */
Cypress.Commands.add('login', (email, password = '12345Qwert!') => {
  return cy
    .request('POST', '/api/users/login', {
      user: { email, password },
    })
    .then((response) => {
      const { user } = response.body

      const sessionUser = {
        bio: user.bio,
        effectiveImage:
          'https://static.productionready.io/images/smiley-cyrus.jpg',
        email: user.email,
        image: user.image,
        token: user.token,
        username: user.username,
      }

      // Save session to localStorage + cookie
      window.localStorage.setItem('user', JSON.stringify(sessionUser))
      cy.setCookie('auth', user.token)

      return sessionUser
    })
})

/**
 * Register + log in immediately.
 */
Cypress.Commands.add('registerAndLogin', () => {
  const username = 'user_' + Date.now()
  const email = `test_${Date.now()}@mail.com`
  const password = '12345Qwert!'

  return cy.request('POST', '/api/users', {
    user: { username, email, password },
  }).then((response) => {
    // save JWT in localStorage so the app knows we are logged in
    window.localStorage.setItem('jwt', response.body.user.token)

    // Save email for later login checks
    Cypress.env('currentEmail', email)

    // visit homepage *after* token is set
    cy.visit('/')
  })
})

/**
 * Helper to get the current test email.
 */
Cypress.Commands.add('getCurrentEmail', () => {
  return Cypress.env('currentEmail')
})

/**
 * Clear local storage and auth cookie (log out).
 */
Cypress.Commands.add('logout', () => {
  window.localStorage.removeItem('user')
  cy.clearCookie('auth')
})
