import SpotifyWebApi from "spotify-web-api-node";

import express from "express";
const spotifyAuthAPI = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: SECRET_KEY,
  redirectUri: RED_URI,
});


PORT = 3000;
// import { Router } from "express";
const app = express();
app.listen

module.exports = { app, spotifyAuthAPI };