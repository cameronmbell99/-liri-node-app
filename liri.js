var axios = require("axios");
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);


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
    console.log("this is the band you're looking for: " + artist);
}

function SpotifySong(parameter) {

}

function OmdbInfo(parameter) {

}