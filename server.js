require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const passport = require("passport");
const auth = require('./auth');
const db = require("./models");
const session = require("express-session");

const Sequelize = require("sequelize");
const SequelizeStore = require("connect-session-sequelize")(session.Store);



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// auth
// Configure the session and session storage.
let sequelize = new Sequelize({
  "username": "root",
  "password": "o7kLUrUb18gdzQzu",
  "database": "trashTaggerDb",
  "host": "localhost",
  "port": 8889,
  "dialect": "mysql"
});
const sessionConfig = {
  resave: false,
  saveUninitialized: true,
  secret: "d3fu0djqefnoasidjfJPFH#9342",
  store: new SequelizeStore({
    table: 'Session',
    db: sequelize,
  }),
};
// app.use(flash());
app.use(session({ 
  resave: false,
  saveUninitialized: true,
  secret: "d3fu0djqefnoasidjfJPFH#9342", 
  store: new SequelizeStore({
      db: sequelize,
      table: 'Session'
    })
  })
);
auth(passport);
app.use(passport.initialize());
// app.use(passport.session());
app.use(passport.session(sessionConfig));
// app.use(function(req, res, next){
//   if(req.url.match('/createEvent'))
//     passport.session()(req, res, next)
//   else
//     next(); // do not invoke passport
// });


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
