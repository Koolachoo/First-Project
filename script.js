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

                if (response._embedded){
                var artistName = $("<h1>").text(response._embedded.events[0].name);
                // $("#lyrics-div").append($("<div>").append(artistName).addClass("box artistBox"));
                $(".modal-card-body").append($("<div>").append(artistName).addClass("box artistBox"));
           

                for (var i = 0; i < response._embedded.events.length; i++) {
                    var artistInfo = response._embedded.events[i];
                    var tourDate = $("<h3>").text(artistInfo.dates.start.localDate);
                    var tourLocation = $("<h3>").text(artistInfo._embedded.venues[0].city.name + ", " + artistInfo._embedded.venues[0].state.stateCode)
                    var venue = $("<h3>").text(artistInfo._embedded.venues[0].name)
                    var tickets = $("<a>").attr("href", artistInfo._embedded.venues[0].url).text("Get tickets here")
                    var artistImage = $("<img>").attr("src", artistInfo.images[0].url);
                    //$("#lyrics-div").empty();
                    $(".modal-card-body").append($("<div>").append(artistImage, tourDate, tourLocation, venue, tickets).addClass("box column is-one-quarter is-flex-desktop-only is-flex-mobile artistBox"));
                }     
            }
           
            if (response._embedded === undefined) {
                var noTour = $("<h1>").text("No current tour dates.");
                $(".modal-card-body").append(noTour);
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

            var titleDiv = $("<p>").text(response.result[i].track);
            var artistDiv = $("<p>").text(response.result[i].artist);
            var albumCover = $("<img>").attr("src", response.result[i].cover).addClass("albumImg");

            $(songBtn).append(titleDiv).append(artistDiv).append(albumCover);
            $(songBtn).addClass("box column is-one-quarter songButtn is-flex-desktop-only is-flex-mobile");

            $("#lyrics-div").append(songBtn);

            $(songBtn).on("click", function (event) {
                event.preventDefault();

                var inputSearch = $(this).data("artist");
                $('.modal-card-body').empty();
                $(".modal-card-title").empty();
                
                console.log(inputSearch);
                ticketMasterData(inputSearch);
                modalOpen();
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

function modalOpen() {
    event.preventDefault();
    var modal = document.querySelector('.modal');  // assuming you have only 1
    var html = document.querySelector("html");
    modal.classList.add('is-active');
    html.classList.add('is-clipped');
    modal.querySelector('.modal-background').addEventListener('click', function(e) {
      e.preventDefault();
      modal.classList.remove('is-active');
      html.classList.remove('is-clipped');
    });
  }