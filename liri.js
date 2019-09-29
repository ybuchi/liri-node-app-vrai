// Read and set any variables with the dotenv package
require("dotenv").config();

//Require the axios package
var axios = require("axios");

//Require the Bands In Town poackage
var bandsintown = require("bandsintown")("codingbootcamp");


// Import keys from keys.js and store them in a variable.
var keys = require("./keys.js");

//Show that node has started up
console.log("------Welcome to LIRI!------");
console.log("Here to make your life easier.");
console.log("-----------------------------");


//Require and access the spotify API npm library
var Spotify = require("node-spotify-api");
 
// You can access keys using this
var spotify = new Spotify(keys.spotify);

//Save all the arguments
var arg = process.argv;

//ARGUMENT 1: Here we define the function that the user will want to use (Spotify song search, OMDB movie search, etc)
var service = arg[2];

//Here we define the user's query
var query = process.argv.slice(3).join(" ");


//Define the query
console.log(arg[2]);

//Use the Spotify API:
if (service === "spotify-this-song"){
spotify
  .search({ type: 'track', query: query })
  .then(function(response) {
    //Display the user's input
    console.log("-----Finding song information for: " + query + " -----");
    console.log("-------------------------------------------------------------");

    for (i = 0; i < 10; i ++){
        console.log("--------------------")
        console.log("///Result " + (i+1));
        console.log("--------------------")
        console.log("Song: " + response.tracks.items[i].name);
        console.log("Artist: " + response.tracks.items[i].artists[0].name);
        console.log("Album: " + response.tracks.items[i].album.name);
        console.log("Song Link: " + response.tracks.items[i].href);
    }//End of For loop
  })
  .catch(function(err) {
    console.log(err);
  });//End of Spotify API call

}else if(service === "movie-this"){
    //include the OMDB API call here
    axios.get("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy").then(
  function(response) {

    console.log("Movie: " + response.data.Title);
    console.log("Release Year: " + response.data.Released);
    console.log("IMDB Rating: " + response.data.Ratings[0].Value);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Country :" + response.data.Country);
    console.log("Language :" + response.data.Language);
    console.log("Movie plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);

    // console.log("The movie's rating is: " + JSON.stringify(response.data, null, 2));
  })//END of OMDB API call
}else if(service === "concert-this"){
    axios
    .get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp")
    .then(function(response) {

        console.log(response.data);
        console.log("Venue Name: " + response.data[0].venue.name);
        console.log("Venue Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country);
        console.log("Venue Date: " + response.data[0].datetime);

    })
};




