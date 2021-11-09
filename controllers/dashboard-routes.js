const router = require("express").Router();
const { Post, User, Comment } = require("../models");

router.get("/dashboard", (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
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
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      res.render("dashboard", { posts });
    })
    .catch((err) => {
      res.render("error", {
        message: err,
        title: `Dashboard`,
      });
    });
});

// Get one post
router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
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
      if (!dbPostData) {
        res.status(404).json({
          message: "4No post found with this id",
        });
        return;
      }
      const post = dbPostData.get({ plain: true });

      res.render("post", { post });
    })
    .catch((err) => {
      res.status(500).json("THIS IS WHERE YOUR ERROR ISSS!!!!!!", err);
    });
});

// create a post
router.post("/post", (req, res) => {
  Post.create({
    title: req.body.post_title,
    post: req.body.post_body,
    // reference_url: req.body.reference_url,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => {
      res.redirect("/dashboard");
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// update a post title
router.post("/post/edit/:id", (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post: req.body.post,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({
          message: "No post found with this id!",
        });
        return;
      }
      res.redirect("/dashboard");
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//edit-post
router.get("/post/edit/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "post", "created_at"],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.render("error", {
          message: "No post found with this id",
          title: `edit post`,
        });
        return;
      }
      const post = dbPostData.get({ plain: true });

      res.render("edit-post", { post });
    })
    .catch((err) => {
      res.render("error", {
        message: err,
        title: `edit post`,
      });
    });
});

// Delete a post
router.post("/post/delete/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.render("delete", {
          message: "No post found with this id",
        });
        return;
      }
      res.redirect("/dashboard");
    })
    .catch((err) => {
      res.render("error", {
        message: err,
        title: `Delete Post ${req.params.id}`,
      });
    });
});

module.exports = router;
