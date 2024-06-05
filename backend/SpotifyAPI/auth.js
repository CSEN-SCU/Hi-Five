import { checkUser, getUserAccessToken, getUserExpirationTime, updateUserExpirationUsingNow, getUserRefreshToken, updateUserAccessToken, Timestamp, updateUserRefreshToken, addUserUsingAuthorizationCode } from '../Firebase/users.js';
import { addPost } from '../Firebase/posts.js';
import { addView } from '../Firebase/views.js';
import qs from 'qs';
import { Buffer } from 'buffer';
// import 'react-native-url-polyfill/auto';
import { sha256 } from 'js-sha256';
import { CLIENT_ID, REDIRECT_URI } from '@env'
const scope = 'user-top-read user-read-private playlist-modify-public playlist-modify-private user-read-recently-played user-library-read user-library-modify';

const generateRandomString = (length) => {
  // console.log("generateRandomString");
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

function base64URLEncode(str) {
  // console.log("base64URLEncode");
  return str
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function sha256Encode(plain) {
  // console.log("sha256Encode");
  const hash = sha256(plain);
  const base64Hash = Buffer.from(hash, 'hex').toString('base64');
  return base64URLEncode(base64Hash);
}

async function getAuthorizationUrl(challenge) {
  // console.log("getAuthorizationUrl");
  return `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&code_challenge_method=S256&code_challenge=${await sha256Encode(challenge)}`;
}

// async function accessTokenIsExpired(accessToken) {}

async function refreshAccessToken(userId) {
  // console.log("refreshAccessToken(userId)"); // DEBUG
  var expiration_time = await getUserExpirationTime(userId);
  // console.log("refreshAccessToken expiration_time.seconds", expiration_time.seconds, "Timestamp.now().seconds", Timestamp.now().seconds); // DEBUG
  if (expiration_time && (expiration_time.seconds > Timestamp.now().seconds)) return await getUserAccessToken(userId);
  else {
    console.log("accessToken has expired, refreshing..."); // DEBUG
    let refreshToken = await getUserRefreshToken(userId);
    // console.log("expirationTime expired, refreshing token.", expiration_time, Timestamp.now());
    // console.log("CLIENT_ID", CLIENT_ID);
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: CLIENT_ID
      })
    });
    const data = await response.json();
    console.log("refreshAccessToken data", data); // DEBUG
    let accessToken = data.access_token;
    refreshToken = data.refresh_token;
    // console.log("refreshAccessToken data", data);
    await Promise.all([
      updateUserAccessToken(userId, accessToken),
      updateUserRefreshToken(userId, refreshToken),
      updateUserExpirationUsingNow(userId, data.expires_in * 1000)
    ]);
    return accessToken;
  }
};

async function useAuthorizationCode(code, codeVerifier) {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      code_verifier: codeVerifier
    })
  });
  const data = await response.json();
  let accessToken = data["access_token"];
  console.log("useAuthorizationCode accessToken", accessToken);
  let userId = await getSpotifyUserIdUsingAccessToken(accessToken);
  console.log("useAuthorizationCode data", data);
  if (await checkUser(userId)) {
    console.log("User exists, updating tokens.");
    await Promise.all([
      updateUserAccessToken(userId, accessToken),
      updateUserExpirationUsingNow(userId, data["expires_in"] * 1000),
      updateUserRefreshToken(userId, data["refresh_token"])
    ]);
  } else {
    console.log("User does not exist, adding user.");
    let username = await getUserDisplayNameUsingAccessToken(accessToken)
    await Promise.add([
      addUserUsingAuthorizationCode(userId, username, data),
      addPost(userId),
      addView(userId)
    ]);
  }
  return userId;
}

async function getSpotifyUserIdUsingAccessToken(accessToken) {
  // console.log("getSpotifyUserIdUsingAccessToken(accessToken)"); // DEBUG
  console.log("getSpotifyUserIdUsingAccessToken accessToken ", accessToken); // DEBUG
  const url = "https://api.spotify.com/v1/me";
  let userId;
  const options = {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
  };
  await fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        console.log("getSpotifyUserIdUsingAccessToken response", response);
        throw new Error("Failed to get user profile");
      }
      return response.json();
    })
    .then((data) => {
      // console.log("data.id", data.id);
      userId = data.id;
    })
    .catch((error) => console.error("Error getting user profile:", error));
  // console.log("userId", userId);
  return userId;
}

async function getUserDisplayNameUsingAccessToken(accessToken) {
  console.log("getUserDisplayNameUsingAccessToken(accessToken)"); // DEBUG
  const url = "https://api.spotify.com/v1/me";
  let displayName;
  const options = {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
  };
  await fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        console.log(response)
        throw new Error("Failed to get user profile");
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data.display_name);
      displayName = data.display_name;
    })
    .catch((error) => console.error("Error getting user profile:", error));
  // console.log("displayName", displayName);
  return displayName;
}

export {
  generateRandomString,
  getAuthorizationUrl,
  refreshAccessToken,
  useAuthorizationCode,
  getSpotifyUserIdUsingAccessToken,
  getUserDisplayNameUsingAccessToken
}