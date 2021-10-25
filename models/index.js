// import models
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');


// create an association between post and user
// User.hasMany(Post, {
//     foreignKey: 'user_id'
// });

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
});


Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
});

// Comment.belongsTo(Post, {
//     foreignKey: 'post_id'
// });

// User.hasMany(Comment, {
//     foreignKey: 'user_id'
// });

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: "CASCADE"
});

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