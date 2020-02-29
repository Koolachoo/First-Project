//var tourAPIURL = "https://cors-anywhere.herokuapp.comhttp://app.ticketmaster.com/discovery/v1/events.json?keyword="+artist+"&apikey=6sAAxZwe571GmYrIVOdWuurpbXAwRhWo&callback=myFunction"
var trackSearch = "We Are the champions";
var lyricAPIURL = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?apikey=e1dd04d17e3320932e5291630f125a22&q_track="+trackSearch;
//var songAPIURL = "https://cors-anywhere.herokuapp.comhttp://api.musixmatch.com/ws/1.1/track.search?apikey=e1dd04d17e3320932e5291630f125a22&q_artist=justin bieber&page_size=3&page=1&s_track_rating=desc"

        $.ajax({
            url: lyricAPIURL,
            method: "GET"
          }).then(function (response) {
            var respJSON = JSON.stringify(response);
            console.log(respJSON);
          });
  
