require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(keys.spotify);

var search = process.argv[2];

var term = process.argv.slice(3).join(" ")

if(search == "concert-this"){
    URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"
    axios.get(URL).then(function(response){
        for(i=0; i<response.data.length; i++){
        console.log(response.data[i].venue.name+ "\n")
        console.log(response.data[i].venue.city + ", " + response.data[i].venue.region+ "\n")
        console.log(response.data[i].datetime+ "\n")
        console.log("--------------------------------\n")
        }
    });
}
else if(search == "spotify-this-song"){

}
else if(search == "movie-this"){

}
else if(search == "do-what-it-says"){

}
else{
    console.log("Error. Please input command with no spaces and '-' between each word.")
}

// spotify
//   .search({ type: 'track', query: 'All the Small Things' })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });