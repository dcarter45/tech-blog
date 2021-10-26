const router = require('express').Router();
const homeRoutes = require('./homepage-routes');
const loginRoutes = require('./login-routes');
const signupRoutes = require('./signup-routes');
const signoutRoutes = require('./signout-routes');
const dashboardRoutes = require('./dashboard-routes');
// const updatedDashboardRoutes = require('./updatedDashboard-routes');

router.use('/', homeRoutes);
router.use('/', loginRoutes);
router.use('/', signupRoutes);
router.use('/', dashboardRoutes);
// router.use('/', updatedDashboardRoutes);
router.use('/', signoutRoutes);

module.exports = router;