console.log("functions.js");

import { getUserPlaylistId, updateUserPlaylistId, updateUserSnapshotPlaylistId } from '../Firebase/users.js'
import { refreshAccessToken } from './auth.js'

async function createPlaylist(userId) {
  console.log("createPlaylist(userId)"); // DEBUG
  // console.log(`userId: ${userId}`);

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
      // console.log(`Playlist '${playlistData.name}' is valid.`);
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
  // console.log("getPlaylist(userId, playlistId)"); // DEBUG
  let accessToken = await refreshAccessToken(userId);
  var isValid = await isValidPlaylist(userId, playlistId);
  if (!isValid) {
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
  // console.log("addTrackToPlaylist(userId, trackUri, playlistId)"); // DEBUG
  // console.log(userId, trackUri, playlistId);
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
  // console.log("removeTrackFromPlaylist(userId, playlistId, trackUri, snapshotPlaylistId)"); // DEBUG
  // console.log(userId, trackUri, snapshotPlaylistId);
  let accessToken = await refreshAccessToken(userId);
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      "tracks": [
        {
          "uri": trackUri,
        },
      ],
      "snapshot_id": snapshotPlaylistId
    })
  };

  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      snapshotPlaylistId = data.snapshot_id;
    });

  updateUserSnapshotPlaylistId(userId, snapshotPlaylistId);
  return snapshotPlaylistId;
}

async function searchForTracks(userId, trackQuery) {
  // console.log("searchForTracks(userId, trackQuery)"); // DEBUG
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
  // console.log("getRecentlyPlayedTracks(userId)"); // DEBUG
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
  // console.log("getTrack(userId, trackUri)"); // DEBUG
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
  createPlaylist,
  getPlaylist,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  searchForTracks,
  getRecentlyPlayedTracks,
  getTrack
};

