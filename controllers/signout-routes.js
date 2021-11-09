const router = require("express").Router();

router.get("/signout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
