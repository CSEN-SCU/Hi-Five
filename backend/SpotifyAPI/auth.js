console.log("auth.js");

import {
  checkUser,
  getUser,
  addUser,
  getUserAccessToken,
  getUserRefreshToken,
  updateUserExpirationUsingNow,
  updateUserAccessToken,
  getUserExpirationTime,
  updateUserRefreshToken,
  Timestamp,
} from "../Firebase/users.js";

//import { Timestamp } from "../Firebase/firebase/firestore/lite";
import SpotifyWebApi from "spotify-web-api-node";

let global_user_id = "";

const spotifyAuthAPI = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

// this contains the login route that the app will be using
// always reauthenticate when logging in e.g. to get new scopes
function loginRoute(app)
{
  console.log("loginRoute(app)"); // DEBUG
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
    console.log(req.cookies["authState"]);

  const scopes = ["user-top-read", "user-read-private", "playlist-modify-public", "playlist-modify-private", "user-read-recently-played", "user-library-read", "user-library-modify"]; 
  const loginLink = spotifyAuthAPI.createAuthorizeURL(scopes, stateString);
  console.log("loginLink: " + loginLink);
  res.redirect(loginLink);
  console.log("Redirected login Link")
  });
}

//this is the redirect route that will get the access token
function redirectRoute(app)
{
  console.log("redirectRoute(app)"); // DEBUG
  app.get("/redpage", (req, res) => {
    console.log(`app.get("/redpage"...`); // DEBUG
    if (req.query.state !== req.cookies["authState"]) {
      // States don't match, send the user away.
      return res.redirect("/");
    }

    res.clearCookie("authState");
    

    const authenticationCode = req.query.code;
    if (authenticationCode) {
      spotifyAuthAPI.authorizationCodeGrant(authenticationCode).then(async (data) => {
        var access_token = data.body["access_token"];
        var expiration_time = data.body["expires_in"] * 1000;
        var refresh_token = data.body["refresh_token"];
        
        console.log("data: ", data);
        global_user_id = await getSpotifyIdFromAccessToken(access_token);
        console.log("global_user_id:", global_user_id); // DEBUG
        // global_user_id = await getSpotifyID(access_token);
        var userName = await getUserName(global_user_id);

        console.log(global_user_id);
        // console.log(await getUser(global_user_id));
        console.log(`Check user ${global_user_id}: ` + await checkUser(global_user_id));

        if (await checkUser(global_user_id))
        {
          console.log("User found: updating user data...");
          await updateUserExpirationUsingNow(global_user_id, expiration_time);
          await updateUserAccessToken(global_user_id, access_token);
          await updateUserRefreshToken(global_user_id, refresh_token);
        }
        else
        {
          console.log("User not found: adding user data...");
          addUser(global_user_id, {
            access_token: access_token,
            app_streak: 5,
            expiration_time: expiration_time,
            friends: [],
            playlist_id: "",
            refresh_token: refresh_token,
            snapshot_playlist_id: "",
            username: userName,
          });
        }

        // console.log("\n\nGod might be dead\n\n");

        // poor man's JSON visualizer.
        // You should stay here or redirect to another page instead of including this bit.
        return res
          .status(200)
          .json(JSON.stringify(data.body, null, 2));
      });
    }
  });
}

async function getSpotifyIdFromAccessToken(access_token)
{
    console.log("getSpotifyIdFromAccessToken(access_token)"); // DEBUG
    console.log("access_token:", access_token); // DEBUG
    console.log(`>${access_token}<`); // DEBUG
    // TODO: need to refresh access token if expired? bearer token not working?
    const url = "https://api.spotify.com/v1/me";
    var spotifyId;

    const options = {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + access_token,
      },
    };
    // console.log("YOLOOOOOOOOO");

    await fetch(url, options)
    .then((response) => {
        if (!response.ok) {
            response.text().then((text) => {
                console.error("Error status code:", response.status);
                console.error("Error response body:", text);
            });
            throw new Error("Failed to get user profile");
        }
        return response.json();
        // if (!response.ok) {
        // throw new Error("Failed to get user profile");
        // }
        // return response.json();
    })
    .then((data) => {
        console.log(data);
        spotifyId = data.id;
        console.log("Spotify ID:", spotifyId);
        // Do something with the Spotify ID
    })
    .catch((error) => console.error("Error getting user profile:", error));
    console.log(typeof spotifyId);
    
    return spotifyId;
}

async function getUserName(user_id) {
  refreshAccessToken(user_id);
  const url = "https://api.spotify.com/v1/me";
  console.log(1111);
  console.log('user_id:', user_id);
  const access_token = await getUserAccessToken(user_id);
  console.log(2222);
  var spotifyName;

  const options = {
    method: "GET",
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
  };

  await fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to get user profile");
      }
      return response.json();
    })
    .then((data) => {
      spotifyName = data.display_name;
      console.log("Spotify Name:", spotifyName);
      // Do something with the Spotify ID
    })
    .catch((error) => console.error("Error getting user name:", error));

  return spotifyName;
}

async function refreshAccessToken(user_id) {
  console.log("refreshAccessToken(user_id)"); // DEBUG
  var access_token = getUserAccessToken(user_id);
  var expiration_time = getUserExpirationTime(user_id);
  if (expiration_time >= Timestamp.now()) {
    spotifyAuthAPI.setRefreshToken(await getUserRefreshToken(user_id));
    console.log("refreshing access token..."); // DEBUG
    const data = await spotifyAuthAPI.refreshAccessToken();
    console.log("refreshed access token!"); // DEBUG
    spotifyAuthAPI.resetRefreshToken();
    access_token = data.body["access_token"];
    updateUserAccessToken(user_id, access_token);
    updateUserExpirationUsingNow(user_id, data.body["expires_in"] * 1000);
  }
  return access_token;
}

export { loginRoute, redirectRoute, refreshAccessToken, global_user_id, getUserName, getSpotifyIdFromAccessToken }
