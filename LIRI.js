require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(keys.spotify);

var search = process.argv[2];

var term = "";

if(search == "concert-this"){
    term = process.argv.slice(3).join(" ");
    URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"
    axios.get(URL).then(function(response){
        for(i=0; i<response.data.length; i++){
        console.log("Venue name: " + response.data[i].venue.name+ "\n")
        console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region+ "\n")
        console.log("Date: " + response.data[i].datetime+ "\n")
        console.log("--------------------------------\n")
        }
    });
}
else if(search == "spotify-this-song"){
    var type = process.argv[3];
    var query = process.argv.slice(4).join(" ")
    spotify
    .search({ type: type, query: query})
    .then(function(response) {
    console.log("Artist Name: " + response.tracks.items[0].album.artists[0].name + "\n");
    console.log("Track Name: " + response.tracks.items[0].name + "\n")
    console.log("Album Name: " + response.tracks.items[0].album.name + "\n")
    console.log("Listen to Song: " + response.tracks.items[0].album.external_urls.spotify + "\n")
    
  })
  .catch(function(err) {
    console.log(err);
  });
}
else if(search == "movie-this"){
  term = process.argv.slice(3).join("+");
  axios.get("http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=d5093d08")
  .then(
  function(response) {
    console.log("Movie Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("The movie's IMDB rating is: " + response.data.imdbRating);
    console.log("The movie's Rotten Tomatoes rating is: " + response.data.Ratings[2].Value);
    console.log("Producing Country: " + response.data.Country);
    console.log("Movie Language: " + response.data.Language);
    console.log("The movie's Plot: " + response.data.Plot);
    console.log("The movie's Actors: " + response.data.Actors);
  });

}
else if(search == "do-what-it-says"){
  var fs = require('fs')
  , filename = process.argv[3];
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('OK: ' + filename);
  console.log(data)
});
}
else{
    console.log("Error. Please input command with no spaces and '-' between each word. Available commands: concert-this, spotify-this-song, movie-this, and do-what-it-says")
}

