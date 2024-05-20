console.log("authentication.js");
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
import { getSpotifyID, getUserName } from "./SpotifyFunctions.js";
import SpotifyWebApi from "spotify-web-api-node";

let global_user_id = "";

const spotifyAuthAPI = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

const generateRandomString = (length) => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

//this contains the login route that the app will be using
function loginRoute(app)
{
  console.log("loginRoute(app)"); // DEBUG
  app.get("/login", (req, res) => {
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
    console.log("Existing here now");
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

        global_user_id = await getSpotifyID(access_token);
        console.log("DEBUG: ", global_user_id);
        var userName = await getUserName(access_token);

        console.log(global_user_id);
        // console.log(await getUser(global_user_id));
        console.log("Check user: " + await checkUser(global_user_id));

        if (await checkUser(global_user_id))
        {
          // console.log("\n\nXringe baby\n\n");
          await updateUserExpirationUsingNow(global_user_id, expiration_time);
          await updateUserAccessToken(global_user_id, access_token);
          await updateUserRefreshToken(global_user_id, refresh_token);
        }
        else
        {
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
          .send(`<pre>${JSON.stringify(data.body, null, 2)}</pre>`);
      });
    }
  });
}

const refreshAccessToken = async (user_id) => {
  console.log("refreshAccessToken(user_id)"); // DEBUG
  var access_token = await getUserAccessToken(user_id);
  var expiration_time = await getUserExpirationTime(user_id);
  if (expiration_time < Timestamp.now()) return access_token;
  else {
    spotifyAuthAPI.setRefreshToken(await getUserRefreshToken(user_id));
    const data = await spotifyAuthAPI.refreshAccessToken();
    spotifyAuthAPI.resetRefreshToken();
    access_token = data.body["access_token"];
    await updateUserAccessToken(user_id, access_token);
    await updateUserExpirationUsingNow(user_id, data.body["expires_in"] * 1000);
    return access_token;
  }
};

function spotifyIDRoute(app)
{
  console.log("spotifyIDRoute(app)"); // DEBUG
  app.get("/id", (req, res) => {
    return res
          .status(200)
          .send({ global_user_id });
  });
}
export { loginRoute, redirectRoute, spotifyIDRoute, refreshAccessToken, generateRandomString, global_user_id}
