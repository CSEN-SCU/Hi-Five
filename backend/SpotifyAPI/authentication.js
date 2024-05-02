import {
  checkUser,
  addUser,
  getUserAccessToken,
  getUserRefreshToken,
  updateUserExpirationTime,
  updateUserAccessToken,
  getUserExpirationTime,
  updateUserRefreshToken,
  Timestamp,
} from "../Firebase/users.js";

//import { Timestamp } from "../Firebase/firebase/firestore/lite";
import { getSpotifyID, getUserName } from "./SpotifyFunctions.js";
import SpotifyWebApi from "spotify-web-api-node";

let global_user_id = "none currently";

const spotifyAuthAPI = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.SECRET_KEY,
  redirectUri: process.env.REDIRECT_URI,
});

//this contains the login route that the app will be using
function loginRoute(app)
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
    console.log(req.cookies["authState"]);

  const scopes = ["user-top-read"];
  const loginLink = spotifyAuthAPI.createAuthorizeURL(scopes, stateString);
  console.log("loginLink: " + loginLink);
  res.redirect(loginLink);
  console.log("Redirected login Link")
  });
}

//this is the redirect route that will get the access token
function redirectRoute(app)
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
      spotifyAuthAPI.authorizationCodeGrant(authenticationCode).then(async (data) => {
        var access_token = data.body["access_token"];
        var expiration_time = data.body["expires_in"] * 1000;
        var refresh_token = data.body["refresh_token"];

        global_user_id = await getSpotifyID(access_token);
        var userName = await getUserName(access_token);

        console.log(global_user_id);
        console.log("Check user: " + await checkUser(global_user_id));

        if (await checkUser(global_user_id))
        {
          console.log("\n\nXringe baby\n\n");
          await updateUserExpirationTime(global_user_id, Timestamp.now() + expiration_time);
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

        console.log("\n\nGod might be dead\n\n");

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
  var access_token = getUserAccessToken(user_id);
  var expiration_time = getUserExpirationTime(user_id);
  if (expiration_time < Timestamp.now()) return access_token;
  else {
    spotifyAuthAPI.setRefreshToken(getUserRefreshToken(user_id));
    spotifyAuthAPI.refreshAccessToken().then((data) => {
      spotifyAuthAPI.resetRefreshToken();
      access_token = data.body["access_token"];
      updateUserAccessToken(user_id, access_token);
      updateUserExpirationTime(user_id, Timestamp.now() + data.body["expires_in"] * 1000);
    });
  }
  return access_token;
};

export { loginRoute, redirectRoute, refreshAccessToken, global_user_id}
