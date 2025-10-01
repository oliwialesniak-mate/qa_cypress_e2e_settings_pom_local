// cypress.config.js
const { defineConfig } = require('cypress')
const { clearDb, resetDb } = require('./cypress/support/dataBase')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: true,
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      on('task', {
        async 'db:clear'() {
          // Return the Promise so Cypress waits
          return clearDb()
        },
        async 'db:reset'() {
          return resetDb()
        },
      })

      return config
    },
  },
})
