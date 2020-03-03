function songSearch(searchQuery) {
    var inputArtist = $("#search").val().trim();

    var happiAPIURL = "https://api.happi.dev/v1/music?q=" + searchQuery + "&limit=50&apikey=c41550a1ttwXwtqNQoHOr3UKRHrfNBHWOY8nhmBCvIK87y2cjbJ0m7CP&type="

    function ticketMasterData(title) {
        $.ajax({
            type: "GET",
            url: "https://app.ticketmaster.com/discovery/v2/events.json?&apikey=6sAAxZwe571GmYrIVOdWuurpbXAwRhWo&sort=date,asc&keyword=" + title,
            async: true,
            dataType: "json",
            success: function (response) {
                console.log(response);

                var artistName = $("<h1>").text(response._embedded.events[0].name);
                $("#lyrics-div").append(artistName);

                for (var i = 0; i < response._embedded.events.length; i++) {
                    var artistInfo = response._embedded.events[i];
                    var tourDate = $("<h3>").text(artistInfo.dates.start.localDate);
                    var tourLocation = $("<h3>").text(artistInfo._embedded.venues[0].city.name + ", " + artistInfo._embedded.venues[0].state.stateCode)
                    var venue = $("<h3>").text(artistInfo._embedded.venues[0].name)
                    var tickets = $("<a>").attr("href", artistInfo._embedded.venues[0].url).text("Get tickets here")
                    var artistImage = $("<img>").attr("src", artistInfo.images[0].url);
                    //$("#lyrics-div").empty();
                    $("#lyrics-div").append(artistImage);
                    $("#lyrics-div").append(tourDate);
                    $("#lyrics-div").append(tourLocation);
                    $("#lyrics-div").append(venue);
                    $("#lyrics-div").append(tickets);
                }
            },
            error: function (xhr, status, err) {
                // This time, we do not end up here!
            }
        });
    }


    $.ajax({
        url: happiAPIURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        for (var i = (response.length - 1); i > 0; i--) {
            var songBtn = $("<button>").data("artist", response.result[i].artist);

            var titleDiv = $("<div>").text(response.result[i].track);
            var artistDiv = $("<div>").text(response.result[i].artist);
            var albumCover = $("<img>").attr("src", response.result[i].cover).width(350).height(300);

            $(songBtn).append(titleDiv).append(artistDiv).append(albumCover);
            $("#lyrics-div").append(songBtn);

            $(songBtn).on("click", function (event) {
                event.preventDefault();

                var inputSearch = $(this).data("artist");
                $("#lyrics-div").empty();
                
                console.log(inputSearch);
                ticketMasterData(inputSearch);
            });

        };
    })
}

$("#submitBtn").on("click", function (event) {
    event.preventDefault();

    var inputSearch = $("#search").val().trim();
    $("#lyrics-div").empty();
    songSearch(inputSearch);
});
