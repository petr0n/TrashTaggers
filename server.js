require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const passport = require("passport");
const auth = require('./auth')
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

// auth
auth(passport);
app.use(passport.initialize());

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

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
