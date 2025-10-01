// cypress.config.js
const { defineConfig } = require('cypress')
const { clear, reset } = require('./cypress/support/dataBase')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: true,
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      on('task', {
        async 'db:clear'() {
          // Always return the Promise so Cypress waits
          return clear()
        },
        async 'db:reset'() {
          return reset()
        },
      })

      return config
    },
  },
})
