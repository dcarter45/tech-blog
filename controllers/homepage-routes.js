const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const router = require("express").Router();
router.get("/", (req, res) => {
  Post.findAll({
    model: Post,
    attributes: ["id", "title", "post", "created_at"],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_contents",
          "post_id",
          "user_id",
          "created_at",
        ],
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
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      res.render("homepage", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
