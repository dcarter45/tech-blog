const path = require('path');
const express = require('express');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const session = require('express-session');
// const sequelize= require('./config/connection')
// const mysql = require('mysql2');

// const cookieParser = require("cookie-parser");
// require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(session({
    secret: 'kfkgjnefgnjire21i31knhkln', 
    // path: '/',
    resave:false,
    saveUninitialized: false
}));


app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// app.use(cookieParser());



app.listen(PORT, () => console.log(`App listening to port ${PORT}`));