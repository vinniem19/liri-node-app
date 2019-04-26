require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

// Make it so liri.js can take in one of the following commands:


//    * `concert-this`
  // node liri.js concert-this <artist/band name here>
  // We want to show

  // let artist = process.argv[4];
  // here is the api request: https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp
        // * Name of the venue
                // 
        // * Venue location
                // data.venueData.city
        // * Date of the Event (use moment to format this as "MM/DD/YYYY")
                // data.eventdata.datetime


//    * `spotify-this-song`
    // node liri.js spotify-this-song '<song name here>
    // We want to display
//      * Artist(s)

//      * The song's name

//      * A preview link of the song from Spotify

//      * The album that the song is from

//   * If no song is provided then your program will default to "The Sign" by Ace of Base.

//    * `movie-this`
        // node liri.js movie-this '<movie name here>
        // Mr. Nobody will be a default movie for data output if no movie title input by user

        //      * Title of the movie.

        //      * Year the movie came out.

        //      * IMDB Rating of the movie.

        //      * Rotten Tomatoes Rating of the movie.

        //      * Country where the movie was produced.

        //      * Language of the movie.

        //      * Plot of the movie.

        //      * Actors in the movie.


//    * `do-what-it-says`
// This is using a require of the random.txt file