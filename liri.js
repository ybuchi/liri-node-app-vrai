// Read and set any variables with the dotenv package
require("dotenv").config();

//Require the axios package
var axios = require("axios");

//Require the fs package
var fs = require("fs");

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
    console.log("-------------------------------------");

    for (i = 0; i < 10; i ++){
        console.log("-------------------------------------")
        console.log("///Result " + (i+1));
        console.log("-------------------------------------")
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

        for(i = 0; i < response.data.length; i++){
            console.log("///Result " + (i+1));
            console.log("Venue Name: " + response.data[i].venue.name);
            console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
            console.log("Venue Date: " + response.data[i].datetime);
            console.log("-------------------------------------");
        }//END of for loop

    })
}else if(service === "do-what-it-says"){

    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        console.log(dataArr);

        var song = dataArr[1];


//Run Spotify this song
spotify
  .search({ type: 'track', query: song })
  .then(function(response) {
    //Display the user's input
    console.log("-----Finding song information for: " + song + " -----");
    console.log("-------------------------------------");

    for (i = 0; i < 10; i ++){
        console.log("-------------------------------------")
        console.log("///Result " + (i+1));
        console.log("-------------------------------------")
        console.log("Song: " + response.tracks.items[i].name);
        console.log("Artist: " + response.tracks.items[i].artists[0].name);
        console.log("Album: " + response.tracks.items[i].album.name);
        console.log("Song Link: " + response.tracks.items[i].href);
    }//End of For loop

      
      })//End of .then function
    });
}
