require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const passport = require("passport");
const auth = require('./auth');
const db = require("./models");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// auth
// Configure the session and session storage.

auth(passport);
app.use(cookieParser());
app.use(session({ 
  resave: true,
  saveUninitialized: true,
  secret: "d3fu0djqefnoasidjfJPFH#9342", 
  store: new SequelizeStore({
    db: db,
    table: 'Session'
  })
}));
app.use(passport.initialize());
app.use(passport.session());


// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    partialsDir: __dirname + '/views/partials/'
  })
);
app.set("view engine", "handlebars");

let routes = require('./controllers/homeController.js');
app.use(routes);
let authRoutes = require('./controllers/authController.js');
app.use(authRoutes);


var syncOptions = { force: false };

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
