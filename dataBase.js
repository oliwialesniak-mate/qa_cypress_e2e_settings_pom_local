const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite3',
  logging: false,
});

async function clear() {
  try {
    await sequelize.query('DELETE FROM User;');
    await sequelize.query('DELETE FROM Article;');
    await sequelize.query('DELETE FROM Comment;');
    await sequelize.query('DELETE FROM Tag;');
    await sequelize.query('DELETE FROM ArticleTag;');
    await sequelize.query('DELETE FROM UserFollowUser;');
    await sequelize.query('DELETE FROM UserFavoriteArticle;');

    console.log('✅ DB was cleared');
  } catch (error) {
    console.error("❌ Can't clear DB", error);
    throw error;
  }
}

module.exports = { clear };
