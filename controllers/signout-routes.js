const router = require('express').Router();

  router.get ('/signout', (req, res) => {
    // console.log(`AAA`, req.body);
    req.session.destroy();
    res.redirect('/')
  });

module.exports = router;
