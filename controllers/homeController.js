const express = require('express');
const router = express.Router();
// const passport = require("passport");

let db = require("../models/");

const Op = db.Sequelize.Op //should this be in the index.js file?


/*********** HTML ROUTES ************/

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
		// res.json(res.user); 
		// console.log('req.user', req.user);
		return res.render("index", { events: results, user: req.user });
	});
});

//Return add event view
router.get("/addEvent", isLoggedIn, function (req, res) {
	// console.log('addevent req.user:', req.user);
	return res.render("addevent", { user: req.user });
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
		return res.render("events", { events: results, user: req.user  });
	});
});


//Get event by id and include the organizer and helpers
router.get('/event/:id', function (req, res) {
	db.Event.findAll({
		include: [{
			model: db.UsersEvents,
			include: [{
				model: db.User
			}],
			where: {EventId: req.params.id}
		}]
	}).then(function (results) {
		//  res.json(results);
		console.log(req.query.joined);
		return res.render("viewevent", { event: results, user: req.user, joined: req.query.joined });
	});
});




/*********** API ROUTES ************/

//Create User, Event and UsersEvents
router.post("/api/add/event", function (req, res) {
	console.log("request", req.body);
	db.User.findOrCreate({
		where: {
			email: req.body.email
		},
		defaults: {
			fullName: req.body.fullName,
			email: req.body.email,
			googleIdToken: req.body.googleIdToken
		}
	}).then(function (dbUser) {
		console.log("dbUser", dbUser)
		db.Event.create({
			eventTitle: req.body.eventTitle,  
			eventLocation: req.body.eventLocation,
			eventDesc: req.body.eventDesc,
			eventDateTime: req.body.eventDateTime,
			byob: req.body.byob
		}).then(function (dbEvent) {
			// console.log("dbUser", dbUser)
			// console.log("dbEvent", dbEvent)
			// console.log ("user id", dbUser[0].dataValues)
			db.UsersEvents.create({
				UserId: dbUser[0].dataValues.id,
				EventId: dbEvent.dataValues.id,
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
	db.User.findOrCreate({
		where: {
			email: req.body.email
		},
		defaults: {
			fullName: req.body.fullName,
			email: req.body.email,
			googleIdToken: req.body.googleIdToken
		}
	}).then(function (dbUser) {
		console.log(dbUser)
		db.UsersEvents.create({
			UserId: dbUser[0].dataValues.id,
			EventId: req.params.eventId
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
	res.redirect('/');
}


module.exports = router;
