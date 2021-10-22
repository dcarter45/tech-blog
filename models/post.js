const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(

  // CONTENTS,TITLE,
   // foreign key has to be the id, and we'll get the user_id which will be a foreign key to user
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id:{
      type: DataTypes.INTEGER,
      references:{
        model:'user',
        key: "id",
      }
    },
    post_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_contents: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;