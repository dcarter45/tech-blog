const router = require("express").Router();
const { Post, User, Comment } = require("../models");

router.get("/dashboard", (req, res) => {
  // console.log(`AAA`);
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: ["id", "post", "title", "user_id"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_contents", "post_id", "user_id"],
        include: {
          model: User,
          attributes: ["user_username"],
        },
      },
      {
        model: User,
        attributes: ["user_username"],
      },
    ],
  })
    .then((dbPostData) => {
      console.log(`found posts`, dbPostData);
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      console.log(posts);
      res.render("dashboard", {posts});
    })
    .catch((err) => {
      console.log("error with dashboard get all", err);
      res.status(500).json(err);
    });
});

// Get one post
router.get('/post/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'post',
                
                'created_at',

            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_contents', 'post_id', 'user_id','created_at',],
                    include: {
                        model: User,
                        attributes: ['user_username']
                    }
                },
                {
                    model: User,
                    attributes: ['user_username']
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({
                    message: '4No post found with this id'
                });
                return;
            }
            const post= dbPostData.get({ plain: true })
            console.log(post);
            res.render('post', {post});
        })
        .catch(err => {
            console.log('err POST', err);
            res.status(500).json('THIS IS WHERE YOUR ERROR ISSS!!!!!!', err);
        });
});

// create a post
router.post("/post", (req, res) => {
  console.log(`creating post`, req.session);
  Post.create({
    title: req.body.post_title,
    post: req.body.post_body,
    // reference_url: req.body.reference_url,
    user_id: req.session.user_id
  })
    .then((dbPostData) => {
      console.log(`created new post`);
      res.redirect("/dashboard");
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).json(err);
    });
});

// update a post title
router.post('/post/edit/:id', (req, res) => {
  Post.update({
          title: req.body.title
      }, {
          where: {
              id: req.params.id
          }
      })
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({
                  message: 'No post found with this id!'
              });
              return;
          }
          res.json(dbPostData);
      })
      .catch(err => {
          console.log('err', err);
          res.status(500).json(err);
      });
});

// Delete a post
// router.delete('/:id', (req, res) => {
//     Post.destroy({
//             where: {
//                 id: req.params.id
//             }
//         })
//         .then(dbPostData => {
//             if (!dbPostData) {
//                 res.status(404).json({
//                     message: 'No post found with this id'
//                 });
//                 return;
//             }
//             res.json(dbPostData);
//         })
//         .catch(err => {
//             console.log('err', err);
//             res.status(500).json(err);
//         });
// });

module.exports = router;
