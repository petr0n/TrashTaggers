//==============REQUIREMENTS==============

// 1. add an event
// 2. join an event

//==============CODE==============

//attach handlers until DOM is loaded
$(function () {

    //add an event
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

        //sned the POST request
        $.ajax("/add/event", {
            type: "POST",
            data: newEvent

        }).then(
            function () {
                console.log("New Event Created!");
                location.reload(); //we may not want to reload the same page here
            }
        ); // ==> end POST request
    }) // ==> end add an event
}) // ==> end CODE