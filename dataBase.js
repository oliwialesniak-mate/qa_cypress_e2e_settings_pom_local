// dataBase.js
const { sequelize } = require('./api/models') // adjust path if needed

async function clear() {
  try {
    await sequelize.truncate({ cascade: true })
    return null
  } catch (err) {
    console.error('❌ Clear failed:', err)
    throw err
  }
}

async function reset() {
  try {
    await sequelize.sync({ force: true })
    return null
  } catch (err) {
    console.error('❌ Reset failed:', err)
    throw err
  }
}

module.exports = { clear, reset }
