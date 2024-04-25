import { getAccessToken, getRefreshToken, getExpirationTime } from '../Firebase/get_from_user.js'
import SpotifyWebApi from "spotify-web-api-node";
import express from "express";
const spotifyAuthAPI = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: SECRET_KEY,
    redirectUri: RED_URI,
  });

// import { Router } from "express";
const app = express();

function getAccessToken(app)
{
  login(app);
  redirect(app);
}

function login(app)
{
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
}

function redirect()
{
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
}

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
