const router = require("express").Router();
const homeRoutes = require("./homepage-routes");
const loginRoutes = require("./login-routes");
const signupRoutes = require("./signup-routes");
const signoutRoutes = require("./signout-routes");
const dashboardRoutes = require("./dashboard-routes");
const commentRoutes = require("./comment-routes");

router.use("/", homeRoutes);
router.use("/", loginRoutes);
router.use("/", signupRoutes);
router.use("/", dashboardRoutes);
router.use("/", signoutRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
