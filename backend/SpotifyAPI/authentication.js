import {
  getUserAccessToken,
  getUserRefreshToken,
  updateUserExpirationTime,
  updateUserAccessToken,
} from "../Firebase/users.js";
import express from "express";
import { access } from "fs";

//this contains the login route that the app will be using
function loginRoute()
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

//this is the redirect route that will get the access token
function redirectRoute()
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
      access_token = data.body["access_token"];
      expiration_time = data.body["expires_in"] * 1000;
      refresh_token = data.body["refresh_token"];

      updateUserAccessToken(access_token);
      updateUserExpirationTime(expiration_time);
      updateUserR

      // poor man's JSON visualizer.
      // You should stay here or redirect to another page instead of including this bit.
      return res
        .status(200)
        .send(`<pre>${JSON.stringify(data.body, null, 2)}</pre>`);
    });
  }
});
}

const refreshAccessToken = (user_id) => {
    if (getUserAccessToken(user_id)) return next();
    else if (getUserAccessToken(user_id)) {
      spotifyAuthAPI.setRefreshToken(getUserRefreshToken(user_id));
      spotifyAuthAPI.refreshAccessToken().then((data) => {
        spotifyAuthAPI.resetRefreshToken();

        const newAccTok = data.body["access_token"];
        updateUserAccessToken(user_id, newAccTok);
        updateUserExpirationTime(user_id, data.body["expires_in"] * 1000);
      });
    }
};
