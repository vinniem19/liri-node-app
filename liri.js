require("dotenv").config();
let keys = require("./keys.js");
let Spotify = require ("node-spotify-api");
let spotify = new Spotify(keys.spotify);
let fs = require("fs");
let axios = require("axios");
let moment = require("moment"); 
// let random = require("random.txt");
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
  let artist = "";
  for (let i = 3; i < process.argv.length; i ++) {
    if  (i > 3 && i < process.argv.length) { 
   artist = artist + "+" + process.argv[i];
 } else {
 artist += process.argv[i];
}
}

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
    // console.log("Venue: " + venueName);
    console.log(venueName);
    // * Venue location
    let venueLocation = data.EventData.VenueData.city;
    // console.log("City: " + venueLocation);
    console.log(venueLocation);
    // * Date of the Event (use moment to format this as "MM/DD/YYYY")
    let eventDate = data.EventData.datetime;
    let formattedDate = eventDate.moment().format("MM,DD,YYYY");
    // console.log("Date: " + formattedDate);
    console.log(formattedDate);
});
}   
    
    
//    * `spotify-this-song`
 function spotifyThis() {

     let songName = "";
     for (let i = 3; i < process.argv.length; i ++) {
        if (process.argv[i] === []){
            songName = "The+Sign";
        } else if (i > 3 && i < process.argv.length) { 
       songName = songName + "+" + process.argv[i];
      } else {
     songName += process.argv[i];
 }
}
     let queryURL = "https://api.spotify.com/v1/search?q=track:" + songName + "&type=track&limit=10";
     console.log(queryURL);
    // node liri.js spotify-this-song '<song name here>
    
      spotify
        .request(queryURL)
        .then(function(data) {
            // show us all the data
              console.log(data); 
              //      * Artist(s)
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            //      * The song's name
            console.log("Song: " + data.tracks.items[0].name);
            //      * A preview link of the song from Spotify
            console.log("URL: " + data.tracks.items[0].preview_url);
            //      * The album that the song is from
            console.log("Album: " + data.tracks.items[0].album.name);
            })
            .catch(function(err) {
                  console.error('Error occurred: ' + err); 
            });

            //   * If no song is provided then your program will default to "The Sign" by Ace of Base.
            
            // console.log(theSignData)
            // console.log(theSignData.tracks.items[i].artists[0].name);
            // console.log(theSignData.tracks.items[i].name);
            // console.log(theSignData.tracks.items[i].preview_url);
            // console.log(theSignData.tracks.items[i].album.name);
                      
            
       }
            
            
//    * `movie-this`
        // using omdbi:
        function movieThis() {
            let movieName = "";
           for (let i = 3; i < process.argv.length; i ++) {
               if (process.argv[i] === []){
                   movieName = "Mr.+Nobody";
               } else if (i > 3 && i < process.argv.length) { 
              movieName = movieName + "+" + process.argv[i];
              // var movieName = "Mr. Nobody";
            } else {
            movieName += process.argv[i];
        }
    }
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        // node liri.js movie-this '<movie name here>
        console.log(queryUrl);

        // using axios
        axios.get(queryUrl).then(
            function(response) {
                // Mr. Nobody will be a default movie for data output if no movie title input by user
                
                //      * Title of the movie.
                        console.log("Movie title: " + response.data.Title)
                //      * Year the movie came out.
                console.log("Release Year: " + response.data.Year);
              
              //      * IMDB Rating of the movie.
                        console.log("IMDB Rating: " + response.data.imdbRating);
              //      * Rotten Tomatoes Rating of the movie.
                        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
              //      * Country where the movie was produced.
                        console.log("Produced in: " + response.data.Country)
              //      * Language of the movie.
                        console.log("Language: " + response.data.Language);
              //      * Plot of the movie.
                        console.log("Plot: " + response.data.Plot);
              //      * Actors in the movie.
                        console.log("Actors: " + response.data.Actors);
            }
          );
        }
//    * `do-what-it-says`
// This is using a require of the random.txt file