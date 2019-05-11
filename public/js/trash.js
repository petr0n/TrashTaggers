
//==============CODE==============

//attach handlers until DOM is loaded
$(function () {

    // add an event
    $(".form-group").on("submit", function (event) {
        event.preventDefault();

        //get newEvent data for POST to db.events
        var newEvent = {
            fullName: $("#fullName").val().trim(),
            email: $("#email").val().trim(),
            eventTitle: $("#eventTitle").val().trim(),
            eventDate: $("#eventDate").val().trim(),
            eventTime: $("#eventTime").val().trim(),
            eventDesc: $("#eventDesc").val().trim(),
            addrOne: $("#addrOne").val().trim(),
            addrTwo: $("#addrTwo").val().trim(),
            city: $("#city").val().trim(),
            state: $("#state").val().trim(),
            zip: $("#zip").val().trim(),
            byob: $("#byob").val().trim(),
        } // ==> end var newEvent

        //send the POST request
        $.ajax("/api/add/event", {
            type: "POST",
            data: newEvent

        }).then(
            function () {
               console.log("New Event Created!");
                location.reload();
            }
        ); // ==> end POST request
    }) // ==> end add an event
    
    // join an event
    $(".joinBtn").on("click", function(event) {
        event.preventDefault();
        $("#joinModal").modal();
    });
    $(".joinFormBtn").on("click", function(event) {
        event.preventDefault();
        var eventId = $(this).data("id");
        var fullName = $("#fullName").val().trim();
        var email = $("#email").val().trim();

        var willJoin = {
            eventId: theEvent,
            fullName: isName,
            email: isEmail
        };

        $.ajax("/api/join" + theEvent, {
            type: "POST",
            data: willJoin
        }).then(
            function() {
                console.log("Success! you've joined " + willJoin);
                location.reload();
            }
        );
    });// ==> end join an event


    
}) // ==> end CODE