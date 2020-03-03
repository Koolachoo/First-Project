function songSearch (searchQuery) {
    var inputArtist = $("#search").val().trim();

    var happiAPIURL = "https://api.happi.dev/v1/music?q="+searchQuery+"&limit=50&apikey=c41550a1ttwXwtqNQoHOr3UKRHrfNBHWOY8nhmBCvIK87y2cjbJ0m7CP&type="

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

        $ (songBtn).append(titleDiv).append(artistDiv).append(albumCover);
        $ ("#lyrics-div").append(songBtn);

        $(songBtn).on("click", function(event) {
            event.preventDefault();
        
            var inputSearch = $(this).data("artist");
            $ ("#lyrics-div").empty();
            
    });

};
})}

$("#submitBtn").on("click", function(event) {
    event.preventDefault();

    var inputSearch = $("#search").val().trim();
    $ ("#lyrics-div").empty();
    songSearch(inputSearch);
  });
