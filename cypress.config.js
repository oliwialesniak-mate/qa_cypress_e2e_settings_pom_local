// cypress.config.js
const { defineConfig } = require('cypress')
const { clear } = require('./dataBase') // ✅ root-level dataBase.js

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: true,
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      on('task', {
        async 'db:clear'() {
          try {
            return await clear() // ✅ return Promise so Cypress waits
          } catch (err) {
            console.error('❌ DB clear failed:', err)
            throw err
          }
        },
      })

      return config
    },
  },
})
