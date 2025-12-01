const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const User = require('./user');

const Post = sequelize.define('Post', {
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  image: DataTypes.STRING,
  authorId: DataTypes.INTEGER,
  categories: DataTypes.STRING,
  tags: DataTypes.STRING,
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
});

Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

module.exports = Post;