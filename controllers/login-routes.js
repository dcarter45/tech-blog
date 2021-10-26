const router = require("express").Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");

router.get("/login", async (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const error = `Wrong Username or Password`;

  User.findOne({
    where: {
      user_username: req.body.user_username,
    },
  })
    .then((user) => {
      const context = { error: error, user_username: req.body.user_username };
      if (user) {
        const myPlaintextPassword = req.body.user_password;
        const hash = user.user_password;
        bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
          // result == true
          if (result) {
            // if user password is correct
            console.log(user.id);
            req.session.loggedIn = true;
            req.session.username = req.body.user_username;
            req.session.user_id = user.id;
            res.redirect("/");
          }
          //if password is incorrect
          else {
            console.log(`you hit the wrong password error`, context);
            res.render("login", context);
          }
        });
      } else {
        console.log(`you hit the wrong username error`);
        res.render("login",context );
      }
    })
    .catch((err) => {
      console.log(`the catch,`, err);
      res.render("login", { error });
    });
});

module.exports = router;
