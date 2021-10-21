const router = require('express').Router();
const { User } = require('../models');


router.get('/signup', async (req, res) => {
    res.render('signup');
  });



  router.post('/signup', (req, res) => {
    console.log(`AAA`, req.body);
    User.create(req.body)
    .then((newUser) => {
        console.log(`created new user`);
        res.redirect('/login')
    })
    .catch((err) => {
        console.log(`the catch,`, err);
     res.render('signup',{err});
     
    });
  });

module.exports = router;
