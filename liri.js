require("dotenv").config();
let keys = require("./keys.js");
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);
let fs = require("fs");
let axios = require("axios");
let moment = require("moment");



function concertThis() {
    // node liri.js concert-this <artist/band name here>
    // We want to show
     let artist = "";
    for (let i = 3; i < process.argv.length; i++) {
        if (i > 3 && i < process.argv.length) {
            artist = artist + "+" + process.argv[i];
        } else {
            artist += process.argv[i];
        }
    }

    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {

            // console.log(response.data)
            let data = response.data;

            //  * Name of the venue; 
            let venueName = data[0].venue.name;
            console.log("Venue: " + venueName);

            // Venue location
            let venueLocation = data[0].venue.city;
            console.log("City: " + venueLocation);

            // Date of the Event 
            let eventDate = data.datetime;
            let formattedDate = moment(eventDate).format("MM/DD/YYYY");
            console.log("Next Concert Date: " + formattedDate);
        })
        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });
}


//    * `spotify-this-song`
function spotifyThis(songName) {

    //   * If no song is provided then your program will default to "The Sign" by Ace of Base.
    if (process.argv[3] == null && (process.argv[2] !== "do-what-it-says")) {
        songName = "The+Sign+Ace+of+Base";
    } else if (process.argv[2] !== "do-what-it-says") {


        for (let i = 3; i < process.argv.length; i++) {

            if (i > 3 && i < process.argv.length) {
                songName = songName + "+" + process.argv[i];
            } 
        }
    }

    console.log(songName);
    let queryURL = "https://api.spotify.com/v1/search?q=track:" + songName + "&type=track&limit=10";

    spotify
        .request(queryURL)
        .then(function (data) {
            // show us all the data
            // console.log(data.tracks);
            //      * Artist(s)
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            //      * The song's name
            console.log("Song: " + data.tracks.items[0].name);
            //      * A preview link of the song from Spotify
            console.log("URL: " + data.tracks.items[0].preview_url);
            //      * The album that the song is from
            console.log("Album: " + data.tracks.items[0].album.name);
        })
        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });
}


//    * `movie-this`
// using omdbi:
function movieThis() {

    let movieName = "";
    if (process.argv[3] == null) {
        movieName = "Mr+Nobody";
    }
    for (let i = 3; i < process.argv.length; i++) {

        if (i > 3 && i < process.argv.length) {
            movieName = movieName + "+" + process.argv[i];
            // var movieName = "Mr. Nobody";
        } else {
            movieName += process.argv[i];
        }
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    // node liri.js movie-this '<movie name here>
    // console.log(queryUrl);

    // using axios
    axios.get(queryUrl).then(
        function (response) {
            // console.log(response.data);
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
    )
        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });
}
//    * `do-what-it-says`
// This is using a readFile of the random.txt file
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err)
        }
        let output = data.split(",");

        console.log(output);

        commandCheck(output[0], output[1]);

    });
};

let commandCheck = function (caseOutput, functionData) {
    switch (caseOutput) {
        case "concert-this":
            concertThis(functionData);
            break;
        case "spotify-this-song":
            spotifyThis(functionData);
            break;
        case "movie-this":
            movieThis(functionData);
            break;
        case "do-what-it-says":
            doWhatItSays(functionData);
    }
}
function doCommand(argOne, argTwo) {
    commandCheck(argOne, argTwo);
}
doCommand(process.argv[2], process.argv[3]);