require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const passport = require("passport");
const auth = require('./auth')
const db = require("./models");

const Sequelize = require("sequelize");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// auth
auth(passport);
app.use(passport.initialize());

let sequelize = new Sequelize({
  "username": "root",
  "password": "o7kLUrUb18gdzQzu",
  "database": "trashTaggerDb",
  "host": "localhost",
  "port": 8889,
  "dialect": "mysql"
});

// Configure the session and session storage.
const sessionConfig = {
  resave: false,
  saveUninitialized: false,
  secret: "d3fu0djqefnoasidjfJPFH#9342",
  //cookie: { maxAge: 60000 }
  // store: new SequelizeStore({
  //   db: sequelize,
  //   table: 'Session'
  // }),
};

app.use(passport.session(sessionConfig));
// app.use(require('./setUserSession.js'));


// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

let routes = require('./controllers/homeController.js');
app.use(routes);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

db.User.belongsToMany(db.Event, {
  through: db.UsersEvents,
  foreignKey: "userId"
});
db.Event.belongsToMany(db.User, {
  through: db.UsersEvents,
  foreignKey: "eventId"
});



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
