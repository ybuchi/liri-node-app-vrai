// Read and set any variables with the dotenv package
require("dotenv").config();

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

    console.log("Song: " + response.tracks.items[0].name);
    console.log("Artist: " + response.tracks.items[0].artists[0].name);
    console.log("Album: " + response.tracks.items[0].album.name);
  })
  .catch(function(err) {
    console.log(err);
  });

};

