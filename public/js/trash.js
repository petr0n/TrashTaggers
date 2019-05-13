
//==============CODE==============

//attach handlers until DOM is loaded
$(function () {

    // add an event
    $("#addEvent").on("submit", function (event) {
        event.preventDefault();

        //get newEvent data for POST to db.events
        var newEvent = {
            eventTitle: $("#eventTitle").val().trim(),
            fullName: $("#fullName").val().trim(),
            email: $("#email").val().trim(),
            addrOne: $("#addrOne").val().trim(),
            addrTwo: $("#addrTwo").val().trim(),
            city: $("#city").val().trim(),
            state: $("#state").val().trim(),
            zip: $("#zip").val().trim(),
            eventDate: $("#eventDateTime").val().trim(),
            eventTime: $("#eventTime").val().trim(),
            eventDesc: $("#eventDesc").val().trim(),
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
    
    // pop modal for join or create to login
    $(".modalBtn").on("click", function(e) {
        e.preventDefault();
        let modalEl = $("#login");
        let action = $(this).data('action');
        let eventId = $(this).data('id');
        if (action === 'create-event'){
            modalEl.find('.loginBtn').attr('href', '/auth/google?action=create-event');
        } else {
            modalEl.find('.loginBtn').attr('href', '/auth/google?action=join&eventId=' + eventId);
        }

        modalEl.modal();
    });
    // join an event
    $(".joinFormBtn").on("click", function(event) {
        event.preventDefault();
        let errorMessage;
        if($("#fullName").val().trim() === '') {
            errorMessage = 'Name required';
        }
        if($("#email").val().trim() === '') {
            errorMessage = 'Email required';
        }

        let willJoin = {
            eventId: $(this).data("id"),
            fullName: $("#fullName").val().trim(),
            email: $("#email").val().trim()
        };

        $.ajax("/api/join" + eventId, {
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