// import models
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');


// Products belongsTo Category
// Post.belongsTo(User,{
//   foreignKey: '',
// });


// Comment.belongsTo(Post,{
//   foreignKey: '',
// })

// User.hasMany(Post, {
//     foreignKey: '',
//     onDelete: 'CASCADE'
//   })
  
module.exports = {
 User,
 Comment,
 Post
};