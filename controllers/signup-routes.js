const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');



router.get('/signup', async (req, res) => {
    res.render('signup');
  });

  router.post ('/signup', (req, res) => {
    const myPlaintextPassword= req.body.user_password;
    const saltRounds = 10;
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
      console.log(hash.length);
      // Store hash in your password DB.
    const userData= {
      user_password:hash,
      user_username:req.body.user_username
    }
      User.create(userData)
      .then((newUser) => {
          console.log(`created new user`);
          res.redirect('/login')
      })
      .catch((err) => {
          console.log(`the catch,`, err);
       res.render('signup',{err});
       
      });
  });
  });

module.exports = router;
