const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const PostVersion = sequelize.define('PostVersion', {
  postId: DataTypes.INTEGER,
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  image: DataTypes.STRING,
  categories: DataTypes.STRING,
  tags: DataTypes.STRING,
});
module.exports = PostVersion;