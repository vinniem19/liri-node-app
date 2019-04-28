let dotenv = require("dotenv").config();
let keys = require("./keys.js");
let Spotify = require ("node-spotify-api");
let spotify = new Spotify(keys.spotify);
let fs = require("fs");
let axios = require("axios");
let moment = require("moment"); 

// Make it so liri.js can take in one of the following commands:

let command = process.argv[2];

// I could make each "command" a function
// and switch to those functions based on the command
 switch (command) {
 case "concert-this":
 concertThis();
 break;
 case "spotify-this-song":
 spotifyThis();
 break;
 case "movie-this":
 movieThis();
 break;
 case "do-what-it-says":
 doWhatItSays();
 }

function concertThis() {
  // node liri.js concert-this <artist/band name here>
  // We want to show
  let artist = process.argv[3];

axios
.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
.then(function(response) {
    if(err) {
       return console.log(err);
    } else {
    console.log(response.data);
    }
    // here is the api request: https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp
    let data = response.data;
    // * Name of the venue
    let venueName = data.EventData.VenueData.name;
    console.log("Venue: " + venueName);
    // * Venue location
    let venueLocation = data.EventData.VenueData.city;
    console.log("City: " + venueLocation);
    
    // * Date of the Event (use moment to format this as "MM/DD/YYYY")
    let eventDate = data.EventData.datetime;
    let formattedDate = eventDate.moment().format("MM,DD,YYYY");
    console.log("Date: " + formattedDate);
});
}   
    
    
//    * `spotify-this-song`
 function spotifyThis() {

     let songName = process.argv[3];
     let queryURL = "https://api.spotify.com/v1/search?&q=track:" + songName + "&type=track&limit=10";
     console.log(queryURL);
    // node liri.js spotify-this-song '<song name here>
    
      spotify
        .request(queryURL)
        .then(function(data) {
              console.log(data); 
            })
            .catch(function(err) {
                  console.error('Error occurred: ' + err); 
            });
            // console.log(theSignData)
            // console.log(theSignData.tracks.items[i].artists[0].name);
            // console.log(theSignData.tracks.items[i].name);
            // console.log(theSignData.tracks.items[i].preview_url);
            // console.log(theSignData.tracks.items[i].album.name);
            // We want to display
            //      * Artist(s)
            
            //      * The song's name
            
            //      * A preview link of the song from Spotify
            
            //      * The album that the song is from
            
            //   * If no song is provided then your program will default to "The Sign" by Ace of Base.
            
       }
            
            
//    * `movie-this`
        // using omdbi:

          if (process.argv[3] === []) {
            var movieName = "Mr. Nobody";
          } else if ((process.argv[3]) && (process.argv[4])) {
            var movieName = ((process.argv[3]) + "+" + (process.argv[4]));
        } else {
            var movieName = process.argv[3];
        }

        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        // node liri.js movie-this '<movie name here>
        console.log(queryUrl);

        // using axios
        axios.get(queryUrl).then(
            function(response) {
                // Mr. Nobody will be a default movie for data output if no movie title input by user
                
                //      * Title of the movie.
                        console.log("Movie title: " + response.Title)
                //      * Year the movie came out.
                console.log("Release Year: " + response.Year);
              
              //      * IMDB Rating of the movie.
                        console.log("IMDB Rating: " + response.imdbRating);
              //      * Rotten Tomatoes Rating of the movie.
                        console.log("Rotten Tomatoes Rating: " + response.Ratings[1].Value);
              //      * Country where the movie was produced.
                        console.log("Produced in: " + response.Country)
              //      * Language of the movie.
                        console.log("Language: " + response.Language);
              //      * Plot of the movie.
                        console.log("Plot: " + response.Plot);
              //      * Actors in the movie.
                        console.log("Actors: " + response.Actors);
            }
          );

//    * `do-what-it-says`
// This is using a require of the random.txt file