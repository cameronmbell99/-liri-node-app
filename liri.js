var axios = require("axios");
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);
var fs = require('fs');
var moment = require("moment");


var method = process.argv[2];
var song = [];
var parameter;
for (var i = 3; i < process.argv.length; i++) {
    song.push(process.argv[i]);
}
if (song !== parameter) {
    parameter = song.join(" ");
}


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

function BandsInTown(parameter) {
    if (!parameter) {
        parameter = "Foo Fighters";
    }
    //console.log(parameter);

    axios.get("https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp").then(
            function(response) {

                var bandInfo = response.data;

                bandInfo.forEach(function(info) {
                    console.log("Venue: " + info.venue.name);
                    console.log("City: " + info.venue.country + ", " + info.venue.city);
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
    if (!parameter) {
        parameter = "The Sign";
    }
    console.log("\nTop 5 Search Results For: " + parameter + "\n");
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


}