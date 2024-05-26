console.log("functions.js");

import { checkUser, getUserAccessToken, updateUserPlaylistId, updateUserSnapshotPlaylistId, getUserExpirationTime, updateUserExpirationUsingNow, getUserRefreshToken, updateUserAccessToken, Timestamp, getUserPlaylistId, updateUserRefreshToken, addUserUsingAuthorizationCodeGrant } from '../Firebase/users.js' 
import base64 from 'react-native-base64';
import qs from 'qs';

import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '@env'

import { _codeVerifier } from '../../integration_test.js';

async function refreshAccessToken(userId) {
  console.log("refreshAccessToken(userId)"); // DEBUG
  var expiration_time = await getUserExpirationTime(userId);
  if (expiration_time && (expiration_time < Timestamp.now())) return await getUserAccessToken(userId);
  else {
    let refreshToken = await getUserRefreshToken(userId);
    console.log("refreshToken", refreshToken);
    console.log("CLIENT_ID", CLIENT_ID);
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
    let accessToken = data.access_token;
    refreshToken = data.refresh_token;
    console.log("refreshAccessToken data", data);
    await Promise.all([
      updateUserAccessToken(userId, accessToken),
      updateUserRefreshToken(userId, refreshToken),
      updateUserExpirationUsingNow(userId, data.expires_in * 1000)
    ]);
    return accessToken;
  }
};

async function useAuthorizationCodeGrant(code) {
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
      code_verifier: _codeVerifier
    })
  });
  const data = await response.json();
  let accessToken = data["access_token"];
  let userId = await getSpotifyUserIdUsingAccessToken(accessToken);
  console.log("useAuthorizationCodeGrant data", data);
  if (await checkUser(userId)) {
    await updateUserAccessToken(userId, accessToken);
    await updateUserExpirationUsingNow(userId, data["expires_in"] * 1000);
    await updateUserRefreshToken(userId, data["refresh_token"]);
  } else {
    await addUserUsingAuthorizationCodeGrant(userId, data);
  }
}

const generateRandomString = (length) => {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

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
        console.log("response", response);
        throw new Error("Failed to get user profile");
      }
      return response.json();
  })
  .then((data) => {
      console.log("data.id", data.id);
      userId = data.id;
  })
  .catch((error) => console.error("Error getting user profile:", error));
  console.log("userId", userId);
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
      console.log(data.display_name);
      displayName = data.display_name;
  })
  .catch((error) => console.error("Error getting user profile:", error));
  console.log("displayName", displayName);
  return displayName;
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
  getSpotifyUserIdUsingAccessToken,
  getUserDisplayNameUsingAccessToken,
  createPlaylist,
  getPlaylist,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  searchForTracks,
  getRecentlyPlayedTracks,
  getTrack
};

