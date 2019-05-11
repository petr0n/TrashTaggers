const express = require('express');
const router = express.Router();
const Sequelize = require("sequelize");
const passport = require("passport");


const Op = Sequelize.Op //should this be in the index.js file?

let db = require("../models/");



// GET /auth/google
router.get('/auth/google',
	passport.authenticate('google', { 
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		] 
	})
); 

router.get('/auth/google/join', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
});


router.get('/', function (req, res) {
	db.Event.findAll({
		limit: 5,
		order: ['eventDateTime']
	}).then(function (results) {
		// res.json(results); //TODO return html instead of json
		return res.render("index", {data: results});
	});
});

//Get all events with an event date greater than or equal to today 
router.get("events", function (req, res) {
	db.Event.findAll({
		where: {
			eventDateTime: {
				[Op.gte]: new Date() // or maybe moment().toDate(); 
			}
		},
		order: ['eventDateTime', 'ASC']
	}).then(function (dbEvent) {
		res.json(dbEvent);
	}); 
});

//Get first n events with an event date greater than or equal to today 
router.get("/api/events/:limit", function (req, res) {
	db.Event.findAll({
		where: {
			eventDateTime: {
				[Op.gte]: new Date() // or maybe moment().toDate(); 
			}
		},
		order: ['eventDateTime', 'ASC'],
		limit: req.param.limit
	}).then(function (dbEvent) {
		res.json(dbEvent);
	});
});

//Get event by id and include the organizer and helpers
router.get('/api/events/:id', function (req, res) {
	db.Event.findAll({
		where: {
			id: req.params.id
		},
		include: [{
			model: db.UsersEvents,
			include: [{
				model: db.User
			}]
		}]
	}).then(function (dbEvent) {
		res.json(dbEvent);
	});
});

//Create Event and UsersEvents
router.post("/api/events", function (req, res) {
	console.log(req.body);
	db.Event.create({
		eventTitle: req.body.eventTitle,  //need the names from the form
		eventLocation: req.body.eventLocation,
		eventDesc: req.body.eventDesc,
		eventDateTime: req.body.eventDateTime,
		byob: req.body.byob
	}).then(function (dbEvent) {
		db.UsersEvents.create({
			userId: req.param.userid,
			eventId: dbEvent.event_id
		}).then(function (dbUsersEvents) {
			res.json(dbUsersEvents);
		});
	});

});

//join event
//TODO -- Parameters or part of the request body????
router.post("/api/UsersEvents/:eventid/:userid", function (req, res) {
	console.log(req.body);
	db.UsersEvents.create({
		userId: req.param.userid,
		eventId: req.param.eventid
	}).then(function (dbUsersEvents) {
		res.json(dbUsersEvents);
	});
});

//create user
router.post("/api/users", function (req, res) {
	console.log(req.body);
	db.User.create({
		fullName: req.body.fullName,
		email: req.body.email,
		googleIdToken: req.body.googleIdToken,
	}).then(function (dbUser) {
		res.json(dbUser);
	});
});

module.exports = router;
