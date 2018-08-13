// code to read and set any environment variables with the dotenv package
require("dotenv").config();
// API Keys and Tokens
var keys = require('./keys.js');
// Twitter npm
var Twitter = require('twitter');
// Spotify npm
var Spotify = require('node-spotify-api');
// request npm
var request = require('request');
// fs npm
var fs = require('fs');
// Variables to access my keys information
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var divider =
    "\n------------------------------------------------------------\n";
var commands = [
    "Type one of these commands after 'node liri.js'",
    "Your Last 5 Tweets:  'my-tweets'",
    "Search Spotify for Track Info:  'spotify-this-song'",
    "Search OMDB for Movie Info:  'movie-this'",
    "Random Search:  'do-what-it-says'"
].join("\n\n");

var liriReturn = process.argv[2];

switch (liriReturn) {
    case "my-tweets":
        tweets();
        break;

    case "spotify-this-song":
        tracks();
        break;

    case "movie-this":
        movies();
        break;

    case "do-what-it-says":
        doRandom();
        break;

    default:
        console.log(divider + commands + divider);
};

function tweets() {

    var para = { screen_name: 'kliving25', limit: 5 };

    client.get('statuses/user_timeline', para, function (error, tweets, response) {

        if (!error && response.statusCode === 200) {
            console.log("Your last 5 tweets are loading...");
            for (var i = 0; i < 5; i++) {

                var tweetResults = [
                    "Tweet " + (i + 1),
                    "Tweet: " + tweets[i].text,
                    "Created at: " + tweets[i].created_at
                ].join("\n\n");
                console.log(divider + tweetResults + divider);
            };

        } else {
            console.log("error: " + error);
            return;
        };
    });
};

function tracks() {

    var trackName = process.argv[3];

    if (!trackName) {
        trackName = "Somebody";
    }

    songRequest = trackName;
    spotify.search({
        type: "track",
        query: songRequest
    },
        function trackSearch(error, data) {
            if (!error) {
                console.log("Your Spotify Song Result is loading...");

                var trackdata = data.tracks.items;

                for (var i = 0; i < 5; i++) {
                    if (!!trackdata[i]) {

                        var spotifyResults = [
                            "Artist: " + trackdata[i].artists[0].name,
                            "Song: " + trackdata[i].name,
                            "Preview URL: " + trackdata[i].preview_url,
                            "Album: " + trackdata[i].album.name,
                        ].join("\n\n");
                        console.log(divider + spotifyResults + divider);
                    }
                }
            }
            else {
                console.log("error: " + error);
                return;
            };
        });
};

function movies() {

    var movieName = process.argv[3];

    if (!movieName) {
        movieName = "The Goonies";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("Your Movie Result is loading...");

            var movieData = JSON.parse(body);
            var movieResults = [
                "Title: " + movieData.Title,
                "Year: " + movieData.Year,
                "IMDB Rating: " + movieData.Ratings[0].Value,
                "Rotten Tomatoes Rating: " + movieData.Ratings[1].Value,
                "Origin Country: " + movieData.Country,
                "Language: " + movieData.Language,
                "Actors: " + movieData.Actors,
                "Plot: " + movieData.Plot
            ].join("\n\n");
            console.log(divider + movieResults + divider);
        } else {
            console.log("error: " + error);
            return;
        };

    });
};

function doRandom() {

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }
        console.log("What she said is loading...");
        console.log(data);

        var doArr = data.split(", ");
        var command = doArr[0];
        var input = doArr[1];
        // tried to set this up to search for what is in random text but was having issues with the scope
        if (command === "my-tweets") {
            myTweets();
        } else if (command === "spotify-this-song") {
            spotifyTrack();
        } else if (command === "movie-this") {
            movies();
        };
        
        var commandArr = [command, input].join("\n\n");
        console.log(divider + commandArr + divider);
    });
};
