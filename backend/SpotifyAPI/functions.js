console.log("functions.js");

//Requires these scopes:
//    playlist-modify-public
//    playlist-modify-private
//    user-read-recently-played
//    user-library-read
//    user-library-write

import { getUserAccessToken, updateUserPlaylistId, updateUserSnapshotPlaylistId, getUserExpirationTime, updateUserExpirationUsingNow, getUserRefreshToken, updateUserAccessToken, Timestamp, getUserPlaylistId } from '../Firebase/users.js' 
// import SpotifyWebApi from "spotify-web-api-node";
import { addUserUsingAuthorizationCodeGrant } from "../Firebase/users.js"











import base64 from 'react-native-base64';
import { URLSearchParams } from 'react-native-url-polyfill';

async function refreshAccessToken(userId) {
  console.log("refreshAccessToken(userId)"); // DEBUG
  var expiration_time = await getUserExpirationTime(userId);
  if (expiration_time && (expiration_time < Timestamp.now())) return await getUserAccessToken(userId);
  else {
    const refreshToken = await getUserRefreshToken(userId); // TODO: what if user doesn't have a refresh token?
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + base64.encode('your_client_id' + ':' + 'your_client_secret')
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      })
    });
    const data = await response.json();
    let accessToken = data.access_token;
    await updateUserAccessToken(userId, accessToken);
    await updateUserExpirationUsingNow(userId, data.expires_in * 1000);
    return accessToken;
  }
};

async function useAuthorizationCodeGrant(code) {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + base64.encode('your_client_id' + ':' + 'your_client_secret')
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'your_redirect_uri'
    })
  });
  const data = await response.json();
  await addUserUsingAuthorizationCodeGrant(data);
}
























// let clientId, clientSecret, redirectUri;

// Node.js environment
// clientId     = process.env.CLIENT_ID;
// clientSecret = process.env.CLIENT_SECRET;
// redirectUri  = process.env.REDIRECT_URI;

// React Native environment
// import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '@env';
// clientId     = CLIENT_ID;
// clientSecret = CLIENT_SECRET;
// redirectUri  = REDIRECT_URI;

// const spotifyAuthAPI = new SpotifyWebApi({
//   clientId:     clientId,
//   clientSecret: clientSecret,
//   redirectUri:  redirectUri,
// });

// console.log(SpotifyWebApi)
// console.log(spotifyAuthAPI)
// spotifyAuthAPI.setRefreshToken(""); // await getUserRefreshToken(user_id)
// await spotifyAuthAPI.refreshAccessToken();
// spotifyAuthAPI.resetRefreshToken();
// console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(spotifyAuthAPI)));



// async function refreshAccessToken(userId) {
//   console.log("refreshAccessToken(userId)"); // DEBUG
//   var expiration_time = await getUserExpirationTime(userId);
//   if (expiration_time && (expiration_time < Timestamp.now())) return await getUserAccessToken(userId);
//   else {
//     spotifyAuthAPI.setRefreshToken(await getUserRefreshToken(userId)); // TODO: what if user doesn't have a refresh token?
//     const data = await spotifyAuthAPI.refreshAccessToken();
//     spotifyAuthAPI.resetRefreshToken();
//     let accessToken = data.body["access_token"];
//     await updateUserAccessToken(userId, accessToken);
//     await updateUserExpirationUsingNow(userId, data.body["expires_in"] * 1000);
//     return accessToken;
//   }
// };

// async function getAuthorizationLink() {
//   spotifyAuthAPI.createAuthorizeURL(scopes, generateRandomString(16));
// }

// async function useAuthorizationCodeGrant(code) {
//   await spotifyAuthAPI.authorizationCodeGrant(code).then(async (data) => {
//     await addUserUsingAuthorizationCodeGrant(data);
//   });
// }

const generateRandomString = (length) => {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

//this method is to get the spotify_id by utilizing the access token. This is done in the authorization phase in
//order to get the key(spotify_id) in order to store the access token

// async function getGlobalID()
// {
//   var spotifyId;

//   await fetch('http://localhost:3000/id')
//   .then((response) => {
//         if (!response.ok) {
//         throw new Error("Failed to get user profile");
//         }
//         return response.json();
//     })
//     .then((data) => {
//         console.log(data);
//         spotifyId = data.global_user_id;
//         console.log("Spotify ID:", spotifyId);
//         // Do something with the Spotify ID
//     })
//     .catch((error) => console.error("Error getting user profile:", error));
//   console.log(typeof spotifyId);
//   return spotifyId;
// }

async function getSpotifyUserIdUsingAccessToken(accessToken) {
  console.log("getSpotifyUserIdUsingAccessToken(accessToken)"); // DEBUG
  const url = "https://api.spotify.com/v1/me";
  let userProfile;
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
      console.log(data);
      userProfile = data;
  })
  .catch((error) => console.error("Error getting user profile:", error));
  console.log(userProfile);
  userProfile = data;
}

async function getUserProfile(userId) {
  let accessToken = await refreshAccessToken(userId);
  console.log("getUserProfile(userId)"); // DEBUG
  const url = "https://api.spotify.com/v1/me";
  let userProfile;
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
      console.log(data);
      userProfile = data;
  })
  .catch((error) => console.error("Error getting user profile:", error));
  console.log(userProfile);
  userProfile = data;
}

async function getUserDisplayName(userId) {
  return (await getUserProfile(userId)).display_name;
}

async function createPlaylist(userId) {
  console.log("createPlaylist(userId)"); // DEBUG
  console.log(`userId: ${userId}`);

  let playlistId = await getUserPlaylistId(userId);
  if (await isValidPlaylist(userId, playlistId)) {
    throw new Error("User already has valid playlist.");
  }

  let accessToken = await refreshAccessToken(userId);
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;

  const options = {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    "name": "Hi-Five Playlist",
    "description": "A playlist that Hi-Five has made",
    "public": false,
  }),
};

  let unparsedData, snapshotPlaylistId;
  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      playlistId = data.id;
      snapshotPlaylistId = data.snapshot_id;
      unparsedData = data;
    });
  updateUserPlaylistId(userId, playlistId);
  updateUserSnapshotPlaylistId(userId, snapshotPlaylistId);
  return unparsedData;
}

async function isValidPlaylist(userId, playlistId) {
  let accessToken = await refreshAccessToken(userId);
  const headers = {
      'Authorization': `Bearer ${accessToken}`
  };

  try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
          method: 'GET',
          headers: headers
      });

      if (response.ok) {
          const playlistData = await response.json();
          console.log(`Playlist '${playlistData.name}' is valid.`);
          return true;
      } else if (response.status === 404) {
          console.log(`Playlist with ID '${playlistId}' not found.`);
      } else {
          const errorData = await response.json();
          console.error('An error occurred:', errorData);
      }
  } catch (error) {
      console.error('An error occurred:', error);
  }

  return false;
}

async function getPlaylist(userId, playlistId) {
  console.log("getPlaylist(userId, playlistId)"); // DEBUG
  let accessToken = await refreshAccessToken(userId);
  var isValid = await isValidPlaylist(userId, playlistId);
  if (!isValid)
  {
    await createPlaylist(userId);
    playlistId = await getUserPlaylistId(userId);
  }
  
  const url = `https://api.spotify.com/v1/playlists/${playlistId}`;

    const options = {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    };

    let unparsedData;
  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      unparsedData = data;
    });

    return unparsedData;
}

async function addTrackToPlaylist(userId, trackUri, playlistId) {
  console.log("addTrackToPlaylist(userId, trackUri, playlistId)"); // DEBUG
  console.log(userId, trackUri, playlistId);
  let accessToken = await refreshAccessToken(userId);
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  const options = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "uris": [trackUri],
      "position": 0,
    }),
  };

  let snapshotPlaylistId;
  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      snapshotPlaylistId = data.snapshot_id
    });

    updateUserSnapshotPlaylistId(userId, snapshotPlaylistId);
    return snapshotPlaylistId
}

async function removeTrackFromPlaylist(userId, trackUri, playlistId, snapshotPlaylistId) {
  console.log("removeTrackFromPlaylist(userId, playlistId, trackUri, snapshotPlaylistId)"); // DEBUG
  console.log(userId, trackUri, snapshotPlaylistId);
  let accessToken = await refreshAccessToken(userId);
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({"tracks": [
      {
        "uri": trackUri,
      },
    ],
    "snapshot_id": snapshotPlaylistId})
  };

  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      snapshotPlaylistId = data.snapshot_id;
    });

    updateUserSnapshotPlaylistId(userId, snapshotPlaylistId);
    return snapshotPlaylistId;
}

async function searchForTracks(userId, trackQuery)
{ 
  console.log("searchForTracks(userId, trackQuery)"); // DEBUG
  let accessToken = await refreshAccessToken(userId);
    const type = "track"; // Specify the type of search (e.g., 'track', 'artist', 'album')

    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(trackQuery)}&type=${type}`;

    const options = {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    };

    let tracks;
    await fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        tracks = data.tracks.items;
      });
    
      return tracks;
    
}

//scope: user-read-recently-played
async function getRecentlyPlayedTracks(userId) {
  console.log("getRecentlyPlayedTracks(userId)"); // DEBUG
  let accessToken = await refreshAccessToken(userId);

  const url = `https://api.spotify.com/v1/me/player/recently-played`;

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  let tracks;
  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      tracks = data.items;
    });
  
    return tracks;

}

async function getTrack(userId, trackUri) {
  console.log("getTrack(userId, trackUri)"); // DEBUG
  let accessToken = await refreshAccessToken(userId);
  const url = `https://api.spotify.com/v1/tracks/${trackUri}`;

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  let unparsedData;
  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      unparsedData = data;
    });
  
    return unparsedData;
}

export {
  useAuthorizationCodeGrant,
  generateRandomString,
  getUserProfile,
  getSpotifyUserIdUsingAccessToken,
  getUserDisplayName,
  createPlaylist,
  getPlaylist,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  searchForTracks,
  getRecentlyPlayedTracks,
  getTrack
};

