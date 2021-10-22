const router = require('express').Router();
const homeRoutes = require('./homepage-routes');
const loginRoutes = require('./login-routes');
const signupRoutes = require('./signup-routes');

router.use('/', homeRoutes);
router.use('/', loginRoutes);
router.use('/', signupRoutes);

module.exports = router;