// foreign key to user
//call it user_id
//date is already created
// need content field
//need ID
// need foreign key to post to kn ow which post they commented on
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(

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
      allowNull: false,
      references:{
        model:'user',
        key: "id",
      }
    },
    comment_contents: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'post',
          key: 'id'
      }
  }},
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;