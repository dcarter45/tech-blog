const router = require('express').Router();
// const withAuth = require('../../utils/auth');
const { Comment } = require('../models');

router.get('/', (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
  console.log(`right before the if`);
  if (req.session) {
    Comment.create({
      comment_contents: req.body.comment_body,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id
    })
    .then((comment) => {
      console.log(`created new comment`);
      res.redirect(`/post/${comment.post_id}`);
    })    
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  }
});

router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;