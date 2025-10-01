// cypress/support/dataBase.js
const { sequelize } = require('../../api/models') // adjust path if needed

// Clears all tables, respecting foreign keys
async function clear() {
  try {
    await sequelize.truncate({ cascade: true })
    return null
  } catch (err) {
    console.error('❌ DB clear failed:', err)
    throw err
  }
}

// Fully resets schema
async function reset() {
  try {
    await sequelize.sync({ force: true }) // drop + recreate tables
    return null
  } catch (err) {
    console.error('❌ DB reset failed:', err)
    throw err
  }
}

module.exports = { clear, reset }
