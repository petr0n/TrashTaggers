
//==============CODE==============

//attach handlers until DOM is loaded
$(function () {

    // add an event
    $("#addEvent").on("submit", function (event) {
        event.preventDefault();
        //console.log("hello");
        //concatenate strings
        var theLocation = $("#addrOne").val().trim() + " " + $("#addrTwo").val().trim() + " " + $("#city").val().trim() + " " + $("#state").val().trim() + " " + $("#zip").val().trim();

        var dateTime = $("#eventDate").val() + " " + $("#eventTime").val();
        
        //get newEvent data for POST to db.events
        var newEvent = {
            eventTitle: $("#eventTitle").val().trim(),
            fullName: $("#fullName").val().trim(),
            email: $("#email").val().trim(),
            eventLocation: theLocation,
            eventDateTime: dateTime,
            eventDesc: $("#eventDesc").val().trim(),
            byob: $("#byob").val().trim(),
        } // ==> end var newEvent

        console.log(newEvent);
        //send the POST request
        $.ajax("/api/add/event", {
            type: "POST",
            data: newEvent

        }).then(
            function (data) {
               console.log(data);
               window.location.href = "/event/" + data.eventId;
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


    $.get('https://www.instagram.com/explore/tags/trashtag/?__a=1', function (data, status) {
      for (var i = 0; i < 6; i++) {
        var isActive = i == 0 ? " active" : "";
        var $this = data.graphql.hashtag.edge_hashtag_to_media.edges[i].node;
        var slide = $('<div class="carousel-item ' + isActive + '" data-interval="5000"></div>');
        slide.append('<img class="d-block w-100" src="' + $this.thumbnail_resources[2].src + '"><div class="carousel-caption d-none d-md-block">' + $this.edge_media_to_caption.edges[0].node.text + '</div>');
        // console.log($this.edge_media_to_caption.edges[0].node.text);
        $('#images').append(slide);
      }
    });
    
}) // ==> end CODE