//==============REQUIREMENTS==============

// 1. add an event
// 2. create user
// 3. join an event

//==============CODE==============

//attach handlers until DOM is loaded
$(function () {

    // 1. add an event
    $(".formClass").on("submit", function (event) {
        event.preventDefault();

        //get newEvent data for POST to db.events
        var newEvent = {
            eventTitle: $("#eventTitle").val().trim(),
            eventDesc: $("#eventDesc").val().trim(),
            eventLocation: $("#manyFields").val().trim(), //1 db column, many form fields
            eventDateTime: $("#eventTime").val().trim(),
            byob: $("[name=byob]:checked").val().trim, //assumes a checkbox
            //googleGeoLocation: on post should we get a lat/long?
        } // ==> end var newEvent

        /*get usersEvents data for POST to db.usersEvents
        var organizer {
            userId: (this).data(googleIdToken),
            eventId: created on insert
            organizer: usersEvents.organizer true
        } // ==> end var organizer */

        //send the POST request
        $.ajax("/add/event", {
            type: "POST",
            data: newEvent

        }).then(
            function () {
               console.log("New Event Created!");
                location.reload(); //we may not want to reload the same page here
            }
        ); // ==> end POST request
    }) // ==> end 1. add an event
    
    // 2. create user
    $(".modalClass").on("submit", function(event) {
        event.preventDefault();

        var newUser = {
            fullName: $("#name").val().trim(),
            email: $("email").val().trim(),
            googleIdToken: wot
        }
        $.ajax("/users", {
           type: "POST",
            data: newUser
        }).then (
            function() {
                console.log("New User Created");
                location.reload(); //we don't want to reload the modal)
            }
        ); // ==> end POST route
        
    }) // ==> end 2. create user

    // 3. join an event
    //when the user clicks an event  to join...
    $(".eventRowId").on("click", function(event) {
        var theEvent = $(this).data("id");
        var thisUserId = $(this).data(googleIdToken); //not sure!

        //console.log(event);
        //console.log("the event the user clicked is " + theEvent);
        //console.log("the user is " + thisUserId);

        var willJoin = {
            userId: thisUserId,
            eventId: theEvent,
        };

        $.ajax("/join/" + theEvent, {
            type: "PUT", //join is a POST in homeController.js but aren't we just adding a user to an event?
            data: willJoin
        }).then(
            function() {
                console.log("Success! you've joined " + willJoin);
                location.reload();
            }
        );

    });// ==> end 3. join an event

}) // ==> end CODE