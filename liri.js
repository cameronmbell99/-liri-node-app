var axios = require("axios");
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);
var moment = require("moment");


var method = process.argv[2];
var parameter = process.argv[3];

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
        break;

}

function BandsInTown(artist) {

    var band = "";
    for (var i = 3; i < process.argv.length; i++) {
        band += process.argv[i];
    }
    if (band !== artist) {
        artist = band;
    }
    //console.log(artist);

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
            function(response) {

                var bandInfo = response.data;

                bandInfo.forEach(function(info) {
                    console.log("Venue: " + info.venue.name);
                    console.log("City: " + info.venue.city);
                    console.log("Date: " + moment(info.datetime).format('L'));
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

}

function OmdbInfo(parameter) {

}