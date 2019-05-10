var express = require("express");
var router = express.Router();

var db = require("../models");

var Op = db.Sequelize.Op;

// router.get('/', function(req, res) {
//     db.Events.findAll({
//         limit: 5,
//         order: ['eventDateTime', 'DESC']
//     }).then(function(results){
//         res.json(results); //TODO return html instead of json
//     });
// });

//Get all events with an event date greater than or equal to today
//rename to /events
//return file "events.handlebars"
router.get("/events", function(req, res) {
  db.Event.findAll({
    where: {
        eventDateTime: {
            [Op.gte]: new Date() // or maybe moment().toDate();
        }
    },
    order: [eventDateTime, 'ASC']
  }).then(function(dbEvent) {
    res.json(dbEvent);
  });
});

//Get first n events with an event date greater than or equal to today
//repurpose to index handlebar
//change to just 5
// router.get("/api/events/:limit", function (req, res) {
//     db.Event.findAll({
//         where: {
//             eventDateTime: {
//                 [Op.gte]: new Date() // or maybe moment().toDate();
//             }
//         },
//         order: [eventDateTime, 'ASC'],
//         limit: req.param.limit
//     }).then(function (dbEvent) {
//         res.json(dbEvent);
//     });
// });

//Get event by id and include the organizer and helpers
//events/id
//return handlebar view w/ data "event"
router.get("/events/:id", function(req, res) {
  db.Event.findAll({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: db.UsersEvents,
        include: [
          {
            model: db.User
          }
        ]
      }
    ]
  }).then(function(dbEvent) {
    res.json(dbEvent);
  });
});

//Create Event and UsersEvents
//add/event
//add organizer true flag
//create user too
router.post("/api/events", function(req, res) {
  console.log(req.body);
  db.Event.create({
    eventTitle: req.body.eventTitle, //need the names from the form
    eventLocation: req.body.eventLocation,
    eventDesc: req.body.eventDesc,
    eventDateTime: req.body.eventDateTime,
    byob: req.body.byob
  }).then(function(dbEvent) {
    db.UsersEvents.create({
      userId: req.param.userid,
      eventId: dbEvent.event_id
    }).then(function(dbUsersEvents) {
      res.json(dbUsersEvents);
    });
  });
});

//join event
//TODO -- Parameters or part of the request body????
//combine with create user
router.post("/api/UsersEvents/:eventid/:userid", function(req, res) {
  console.log(req.body);
  db.UsersEvents.create({
    userId: req.param.userid,
    eventId: req.param.eventid
  }).then(function(dbUsersEvents) {
    res.json(dbUsersEvents);
  });
});

//create user
router.post("/api/users", function(req, res) {
  console.log(req.body);
  db.User.create({
    fullName: req.body.fullName,
    email: req.body.email,
    googleIdToken: req.body.googleIdToken
  }).then(function(dbUser) {
    res.json(dbUser);
  });
});

module.exports = router;
