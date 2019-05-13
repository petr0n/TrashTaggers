const express = require('express');
const router = express.Router();
// const passport = require("passport");

let db = require("../models/");

const Op = db.Sequelize.Op //should this be in the index.js file?


//Returns up to 5 events for display on the home page
router.get('/', function (req, res) {
	db.Event.findAll({
		where: {
			eventDateTime: {
				[Op.gte]: new Date() // or maybe moment().toDate(); 
			}
		},
		order: [['eventDateTime', 'ASC']],
		limit: 5
	}).then(function (results) {
		// res.json(res.user); //TODO return html instead of json
		// console.log('req.user', req.user);
		return res.render("index", { events: results, user: req.user });
	});
});

//Return add event view
router.get("/addEvent", function (req, res) {
	let data = { x: "f" };
	// console.log('addevent req.user:', req.user);
	return res.render("addevent", { data: data, user: req.user });
});


//Get all events with an event date greater than or equal to today 
router.get("/events", function (req, res) {
	db.Event.findAll({
		where: {
			eventDateTime: {
				[Op.gte]: new Date() // or maybe moment().toDate(); 
			}
		},
		order: [['eventDateTime', 'ASC']]
	}).then(function (results) {
		// res.json(dbEvent);
		// console.log(res.json(dbEvent)); 
		return res.render("events", { events: results });
	});
});


//Get event by id and include the organizer and helpers
router.get('/event/:id', function (req, res) {
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
	}).then(function (results) {
		// res.json(dbEvent);
		console.log((results));
		return res.render("viewevent", { event: results });
	});
});

//Create User, Event and UsersEvents
router.post("/api/add/event", function (req, res) {
	console.log(req.body);
	db.User.create({
		fullName: req.body.fullName,
		email: req.body.email,
		googleIdToken: req.body.googleIdToken,
	}).then(function (dbUser) {
		console.log(dbUser)
		db.Event.create({
			eventTitle: req.body.eventTitle,  //need the names from the form
			eventLocation: req.body.eventLocation,
			eventDesc: req.body.eventDesc,
			eventDateTime: req.body.eventDateTime,
			byob: req.body.byob
		}).then(function (dbEvent) {
			db.UsersEvents.create({
				UserId: dbUser.dataValues.id,
				eventId: dbEvent.dataValues.id,
				organizer: true
			}).then(function (dbUsersEvents) {
				console.log(dbUsersEvents)
				res.json(dbUsersEvents);
			});
		});
	});
});

//Join Event 
//Create User (if doesn't already exist), and UsersEvents
router.post("/api/join/:eventId", function (req, res) {
	console.log(req.body);
	db.User.create({
		fullName: req.body.fullName,
		email: req.body.email,
		googleIdToken: req.body.googleIdToken,
	}).then(function (dbUser) {
		console.log(dbUser)
		db.UsersEvents.create({
			UserId: dbUser.dataValues.id,
			eventId: req.params.eventId
		}).then(function (dbUsersEvents) {
			console.log(dbUsersEvents)
			res.json(dbUsersEvents);
		});
	});
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	console.log('req', req.isAuthenticated());
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
			return next();

	// if they aren't redirect them to the home page
	res.redirect('/auth/google');
}


module.exports = router;
