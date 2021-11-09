const path = require("path");
const express = require("express");
const routes = require("./controllers");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  session({
    secret: "kfkgjnefgnjire21i31knhkln",

    resave: false,
    saveUninitialized: false,
  })
);

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

app.listen(PORT, () => console.log(`App listening to port ${PORT}`));
