//http://localhost:3000/

const GetPlaylist = require("./GetPlaylist");
const AddMusicToPlaylist = require("./AddMusicToPlaylist");
const CreatePlaylist = require("./CreatePlaylist");
const FindSongAndArtists = require("./FindSongAndArtists");
const RecentlyPlayedTracks = require("./RecentlyPlayedTracks");
const DeleteTracksFromPlaylist = require("./DeleteTracksFromPlaylist");
const SearchPlaylist = require("./SearchPlaylist");

require('dotenv').config()

// variables
const PORT = 3000;
const CLIENT_ID = process.env.CLIENT_ID;
const SECRET_KEY = process.env.SECRET_KEY;
const RED_URI = process.env.RED_URI;
// We set RED_URI in process.env but have falsy alternatives set in place, just in case.

// This object is going to be used for authentication alone. We make separate SpotifyWebApis for our actual API calls with access tokens.
const SpotifyWebApi = require("spotify-web-api-node");
const spotifyAuthAPI = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: SECRET_KEY,
  redirectUri: RED_URI,
});

const express = require("express");
// import { Router } from "express";
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/login", (req, res) => {
  const generateRandomString = (length) => {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  const stateString = generateRandomString(16);
  res.cookie("authState", stateString);

    const scopes = ["user-top-read"];
    const loginLink = spotifyAuthAPI.createAuthorizeURL(scopes, stateString);
    console.log("loginLink: " + loginLink);
    res.redirect(loginLink);
    console.log("Redirected login Link")
});

app.get("/redpage", (req, res) => {
    console.log("Existing here now");
  if (req.query.state !== req.cookies["authState"]) {
    // States don't match, send the user away.
    return res.redirect("/");
  }

  res.clearCookie("authState");

  const authenticationCode = req.query.code;
  if (authenticationCode) {
    spotifyAuthAPI.authorizationCodeGrant(authenticationCode).then((data) => {
      res.cookie("accTkn", data.body["access_token"], {
        maxAge: data.body["expires_in"] * 1000,
      });
      res.cookie("refTkn", data.body["refresh_token"]);

      // poor man's JSON visualizer.
      // You should stay here or redirect to another page instead of including this bit.
      return res
        .status(200)
        .send(`<pre>${JSON.stringify(data.body, null, 2)}</pre>`);
    });
  }
});

const accTknRefreshments = (req, res, next) => {
  if (req.cookies["accTkn"]) return next();
  else if (req.cookies["refTkn"]) {
    spotifyAuthAPI.setRefreshToken(refresh_token);
    spotifyAuthAPI.refreshAccessToken().then((data) => {
      spotifyAuthAPI.resetRefreshToken();

      const newAccTok = data.body["access_token"];
      res.cookie("accTkn", newAccTok, {
        maxAge: data.body["expires_in"] * 1000,
      });

      return next();
    });
  } else {
    return res.redirect("/login");
  }
};


app.get("/faves", accTknRefreshments, (req, res) => {
    console.log("faves"); // MATTY
    console.log(req.cookies["accTkn"]);
  const spotifyAPI = new SpotifyWebApi({ accessToken: req.cookies["accTkn"] });

  // query Spotify's top tracks endpoint for a user API, with a max track count of count and time range
  // extended over the user's entire account
  count = 12;
  spotifyAPI
    .getMyTopTracks({ limit: count, time_range: "long_term" })
      .then((data) => {
      res.setHeader("Content-Type", "application/json");
        //   console.log(res.getHeaders(), '\n\n\n\n');
        //   console.log(data.body.items, '\n\n\n\n');
        //   console.log(JSON.stringify(data.body.items, null, 2));
      return res
        .status(200)
        .send(JSON.stringify(data.body.items, null, 2));
    });
});

app.get('/', (req, res) => {
    console.log(1); // MATTY
    console.log(req.cookies["accTkn"]); // MATTY
    const spotifyAPI = new SpotifyWebApi({ accessToken: req.cookies["accTkn"] });
    console.log(spotifyAPI); // MATTY
    console.log(2); // MATTY
  res.send('Hi-Five Backend!')
})


function getPlaylist(playlistID)
{
    const router = GetPlaylist.GetPlaylistAPI(accTknRefreshments, playlistID);
    app.use(router);
}

function addMusicToPlaylist(playlistID, tracksID)
{
    const router = AddMusicToPlaylist.AddMusicToPlaylistAPI(accTknRefreshments, playlistID, tracksID);
    app.use(router);
}

function createPlaylist()
{
    const router = CreatePlaylist.CreatePlaylistAPI(accTknRefreshments) 
    app.use(router);
}

function findSongAndArtists(trackName, artistName)
{
    const router = FindSongAndArtists.FindSongAndArtistsAPI(accTknRefreshments, trackName, artistName)
    app.use(router);
    //fetch("http://localhost:3000/faves").then(x => x.text()).then(y => console.log(y));
}

function recentlyPlayedTracks(numOfTracks)
{
    const router = RecentlyPlayedTracks.RecentlyPlayedTracksAPI(accTknRefreshments, numOfTracks)
    app.use(router);
}

function searchPlaylists(playlistName)
{
    const router = SearchPlaylist.SearchPlaylistAPI(accTknRefreshments, playlistName);
    app.use(router);
}

function searchPlaylists(playlistId, tracks, options)
{
    const router = DeleteTracksFromPlaylist.DeleteTracksFromPlaylistAPI(playlistId, tracks, options, accTknRefreshments) ;
    app.use(router);
}

findSongAndArtists("Magnetic", "ILLIT");

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

var access_token = null;
const getAccessToken = (req) => {
    return req.cookies["accTkn"];
};

app.get("/some-route", (req, res) => {
    access_token = getAccessToken(req);
});


module.exports = {access_token};