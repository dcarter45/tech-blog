const router = require('express').Router();
const blogRoutes = require('./blog-routes');
const loginRoutes = require('./login-routes');
const signupRoutes = require('./signup-routes');

router.use('/', blogRoutes);
router.use('/', loginRoutes);
router.use('/', signupRoutes);

module.exports = router;