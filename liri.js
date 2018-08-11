// code to read and set any environment variables with the dotenv package
require("dotenv").config();
// API Keys and Tokens
var keys = require('./keys.js');
// Twitter npm
var twitter = require('twitter');
// Spotify npm
var spotify = require('node-spotify-api');
// request npm
var request = require('request');
// Title of Movie 
var movieName = process.argv[3];
// 
var liriReturn = process.argv[2];
// fs npm
var fs = require('fs');
// Variables to access my keys information
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);



