const router = require('express').Router();
const { User } = require('../models');


router.get('/login', async (req, res) => {
    res.render('login');
  });

  router.post ('/login', (req, res) => {
    console.log(`AAA`, req.body);
    User.create(req.body)
    .then((userLogin) => {
        console.log(`user successfully logged in`);
        res.redirect('/homepage')
    })
    .catch((err) => {
        console.log(`the catch,`, err);
     res.render('login',{err});
     
    });
  });

module.exports = router;
