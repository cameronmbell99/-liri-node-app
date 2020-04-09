var axios = require("axios");
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);
var fs = require('fs');
var moment = require("moment");

//sets method to the second command line argument in the array
var method = process.argv[2];

//sets parameter to all the words after the command 
var parameter = process.argv.slice(3).join(" ").toLowerCase();


//calls the related function
function liriApp(method, parameter) {
    switch (method) {
        case "concert-this":
            BandsInTown(parameter);
            break;

        case "spotify-this-song":
            SpotifySong(parameter);
            break;

        case "movie-this":
            OmdbInfo(parameter);
            break;

        case "do-what-it-says":
            readRandom();
            break;

    }

    function BandsInTown(parameter) {

        //sets the parameter to foo fighters if no parameter is set
        if (!parameter) {
            parameter = "Foo Fighters";
        }
        console.log("\nConcerts for this band: " + parameter + "\n");

        //Runs a request with axios to the bandsintown API
        axios.get("https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp").then(
                function(response) {

                    var bandInfo = response.data;

                    bandInfo.forEach(function(info) {
                        console.log("Venue: " + info.venue.name);
                        console.log("City: " + info.venue.country + ", " + info.venue.city);
                        console.log("Date: " + moment(info.datetime).format('L') + "\n");
                    });


                })
            .catch(function(error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    }

    function SpotifySong(parameter) {
        if (!parameter) {
            parameter = "The Sign";
        }
        console.log("\nTop 5 Search Results For: " + parameter + "\n");

        //spotify search for the top 5 related songs
        spotify
            .search({ type: 'track', query: parameter, limit: 5 })
            .then(function(response) {
                var music = response.tracks.items;
                music.forEach(function(track) {
                    var artists = track.artists;
                    var musicianData = [];
                    artists.forEach(function(musician) {
                            musicianData = [musician.name].join(", ");
                        })
                        //console.log(musicianData);

                    //displays url or shows no url provided
                    var url;
                    if (!track.preview_url) {
                        url = "none provided";
                    } else {
                        url = track.preview_url;
                    }

                    var songData = [
                        "Artist(s): " + musicianData,
                        "Song: " + track.name,
                        "Album: " + track.album.name,
                        "Preview Link: " + url
                    ].join("\n");

                    console.log(songData + "\n");
                })
            }).catch(function(err) {
                console.log(err);
            });

    }

    function OmdbInfo(parameter) {
        if (!parameter) {
            parameter = "Mr. Nobody";
        }

        //console.log(parameter);


        //Runs a request with axios to the omdb API
        axios.get("http://www.omdbapi.com/?t=" + parameter + "&y=&plot=short&apikey=trilogy")
            .then(function(response) {

                //set reponse data in movie info to be called 
                var movieInfo = response.data;

                //use movie info to call each element of the called movie
                var movieData = [
                    "Title: " + movieInfo.Title,
                    "Released: " + movieInfo.Year,
                    "IMDB Rating: " + movieInfo.imdbRating,
                    "Rotten Tomatoes Rating: ",
                    "Country: " + movieInfo.Country,
                    "Language(s): " + movieInfo.Language,
                    "Plot: " + movieInfo.Plot,
                    "Actors: " + movieInfo.Actors
                ].join('\n');

                console.log("\n" + movieData + "\n");

            })
            .catch(function(error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    }

    function readRandom() {
        //console.log("do-what-it-says called");

        //reads file random.txt
        fs.readFile("random.txt", "utf8", function(error, ranData) {
            if (error) {
                console.log(error);
            } else {
                //reads cmd,prmtr and turns into array[cmd,prmtr]
                var ranArr = ranData.split(",")
                var cmd = ranArr[0];
                var prmtr = ranArr[1];

                liriApp(cmd, prmtr);
            }
        })
    }
}

liriApp(method, parameter);