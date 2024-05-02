import express from "express";
import request from "request";
import crypto from "crypto";
import cors from "cors";
import querystring from "querystring";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config({ path: '../../.env' });

var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var redirect_uri = process.env.REDIRECT_URI;

const generateRandomString = (length) => {
  return crypto.randomBytes(60).toString("hex").slice(0, length);
};

var stateKey = "spotify_auth_state";

var app = express();

app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser());

app.get("/login", function (req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = "user-top-read";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

app.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  console.log(state); // DEBUG
  console.log(storedState); // DEBUG

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          "/#" +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

app.get("/refresh_token", function (req, res) {
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token,
        refresh_token = body.refresh_token;
      res.send({
        access_token: access_token,
        refresh_token: refresh_token,
      });
    }
  });
});

// app.get('/', function(req, res) {
//     res.send("Hi-Five Backend!");
// });

app.get("/toptracks", function (req, res) {
  var access_token = process.env.DEBUG_ACCESS_TOKEN;
  // var access_token = req.cookies['access_token']; // replace this with however you're storing the access token

  // if (!access_token) {
  //   return res.status(401).send('Unauthorized: No access token provided');
  // }

  var options = {
    url: "https://api.spotify.com/v1/me/top/tracks",
    headers: { Authorization: "Bearer " + access_token },
    json: true,
  };

  request.get(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      res.status(response.statusCode).send(body);
    }
  });
});

console.log("Listening on 8888");
app.listen(8888);

access_token = process.env.DEBUG_ACCESS_TOKEN;

fetch(
  "http://localhost:8888/toptracks"
  // ,
  // {
  //   headers: {
  //     'Authorization': 'Bearer ' + access_token
  //   }
  // }
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
