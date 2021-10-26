const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    res.render('homepage', {posts});
  });

const posts= [{
    id:1,
    author: 'Darrell',
    content:'Be kind to one another'
},
{
    id:2,
    author: 'jermaine cole',
    content:'Love is a Drug, its like the strongest stuff ever'
}];

  module.exports = router;

// const router = require('express').Router();
// const sequelize = require('../config/connection');
// const { Post, User, Comment } = require('../models');

// router.get('/homepage', (req, res) => {
//     Post.findAll({
//       attributes: [
//         'id',
//         'title',
//       ],
//       include: [
//         {
//           model: Comment,
//           attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at']
//         },
//       ]
//     })
//       .then(dbPostData => {
//         const posts = dbPostData.map(post => post.get({ plain: true }));
//         res.render('homepage', {
//             posts,
//             loggedIn: req.session.loggedIn
//           });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

// router.get('/login', (req, res) => {
//     if (req.session.loggedIn) {
//       res.redirect('/');
//       return;
//     }
  
//     res.render('login');
//   });

//   router.get('/signup', (req, res) => {
//     if (req.session.loggedIn) {
//       res.redirect('/');
//       return;
//     }
  
//     res.render('signup');
//   });

//   router.get('/post/:id', (req, res) => {
//     Post.findOne({
//       where: {
//         id: req.params.id
//       },
//       attributes: [
//         'id',
//         'title',
        
//       ],
//       include: [
//         {
//           model: Comment,
//           attributes: ['id', 'comment_text', 'post_id', 'user_id'],
          
//         },
//       ]
//     })
//       .then(dbPostData => {
//         if (!dbPostData) {
//           res.status(404).json({ message: 'No post found with this id' });
//           return;
//         }
  
//         // serialize the data
//         const post = dbPostData.get({ plain: true });
  
//         // pass data to template
//         res.render('single-post', {
//             post,
//             loggedIn: req.session.loggedIn
//           });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
// });

// module.exports = router;

  