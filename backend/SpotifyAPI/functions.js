console.log("functions.js");

import {
  getUserAccessToken,
  getUserPlaylistId,
  updateUserPlaylistId,
  updateUserSnapshotPlaylistId,
} from "../Firebase/users.js";
import { refreshAccessToken } from "./auth.js";

/**
 * Function Name: createPlaylist
 * Description: This function creates a playlist called Hi-Five playlist.
 *
 * @param {string} user_id - spotify ID
 * @returns {JSON} unparsed data about the playlist
 *
 * Example:
 * data = createPlaylist(user_id);
 */
async function createPlaylist(userId) {
  // console.log("createPlaylist(userId)"); // DEBUG
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
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Hi-Five Playlist",
      description: "A playlist that Hi-Five has made",
      public: false,
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
  await updateUserPlaylistId(userId, playlistId);
  await updateUserSnapshotPlaylistId(userId, snapshotPlaylistId);
  return unparsedData;
}

/**
 * Function Name: isValidPlaylist
 * Description: This function checks to see if the playlist exists/valid
 *
 * @param {string} playlistId - playlist ID
 * @param {string} user_id - spotify ID
 * @returns {boolean} Returns true if the playlist exists; otherwise return false
 *
 * Example:
 * isValidPlaylist(user_id, playlistId);
 */
async function isValidPlaylist(userId, playlistId) {
  let accessToken = await refreshAccessToken(userId);
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    if (response.ok) {
      const playlistData = await response.json();
      // console.log(`Playlist '${playlistData.name}' is valid.`);
      return true;
    } else if (response.status === 404) {
      console.log(`Playlist with ID '${playlistId}' not found.`);
    } else {
      const errorData = await response.json();
      console.error("An error occurred:", errorData);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }

  return false;
}

/**
 * Function Name: getPlaylist
 * Description: This function get the contents of the playlist.
 *
 * @param {string} user_id - spotify ID
 * @param {string} playlist_id - playlist ID
 * @returns {JSON} unparsed data about the playlist
 *
 * Example:
 * data = getPlaylist(user_id);
 */
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

/**
 * Function Name: addTrackToPlaylist
 * Description: This function adds a song to a playlist.
 *
 * @param {string} user_id - spotify ID
 * @param {string} song_uri - uri of the song
 * @param {string} playlist_id - playlist ID
 * @returns {string} the snapshot of the playlist
 *
 * Example:
 * snapshot = addMusicToPlaylist(user_id, song_uri, playlist_id);
 */
async function addTrackToPlaylist(userId, trackUri, playlistId) {
  // console.log("addTrackToPlaylist(userId, trackUri, playlistId)"); // DEBUG
  // console.log(userId, trackUri, playlistId);
  let accessToken = await refreshAccessToken(userId);
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: [trackUri],
      position: 0,
    }),
  };

  let snapshotPlaylistId;
  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      snapshotPlaylistId = data.snapshot_id;
    });

  await updateUserSnapshotPlaylistId(userId, snapshotPlaylistId);
  return snapshotPlaylistId;
}

/**
 * Function Name: removeTrackFromPlaylist
 * Description: This function removes a song from a playlist.
 *
 * @param {string} user_id - user ID
 * @param {string} song_uri - uri of the song
 * @param {string} playlist_id - playlist ID
 * @param {string} snapshot - playlist ID
 * @returns {JSON} the unparsed data of the playlist
 *
 * Example:
 * snapshot = deleteTrackFromPlaylist(user_id, playlist_id ,song_uri, snapshot);
 */
async function removeTrackFromPlaylist(
  userId,
  trackUri,
  playlistId,
  snapshotPlaylistId
) {
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
      tracks: [
        {
          uri: trackUri,
        },
      ],
      snapshot_id: snapshotPlaylistId,
    }),
  };

  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      snapshotPlaylistId = data.snapshot_id;
    });

  await updateUserSnapshotPlaylistId(userId, snapshotPlaylistId);
  return snapshotPlaylistId;
}

/**
 * Function Name: searchForTracks
 * Description: This function searches for a song.
 *
 * @param {string} userId - user ID
 * @param {string} trackQuery - song name or part of a song name
 * @returns {JSON} the unparsed data of the searched tracks
 *
 * Example:
 * search_list = findSongAndArtists(user_id, searchTerm);
 */
async function searchForTracks(userId, trackQuery, signal) {
  let accessToken = await refreshAccessToken(userId);
  const type = "track";

  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    trackQuery
  )}&type=${type}`;

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  // Add signal to options if it's provided
  if (signal) {
    options.signal = signal;
  }

  let tracks;
  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      if (data.tracks) {
        tracks = data.tracks.items;
      } else {
        console.log("No tracks found");
        tracks = [];
      }
    });

  return tracks;
}

/**
 * Function Name: recentlyPlayedTracks
 * Description: This function gets the most recently played tracks.
 *
 * @param {string} userId - user ID
 * @returns {JSON} the unparsed data of the 20 most recently played tracks
 *
 * Example:
 * recently_played_songs = recentlyPlayedTracks(user_id);
 */
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

/**
 * Function Name: getTrack
 * Description: This function gets the track based on the track ID.
 *
 * @param {string} userId - user ID
 * @param {string} trackUri - track ID
 * @returns {JSON} gets the unparsed data of the track
 *
 * Example:
 * track_data = getTrack(user_id, track_id);
 */
async function getTrack(userId, trackUri) {
  try {
    let accessToken = await refreshAccessToken(userId);
    const url = `https://api.spotify.com/v1/tracks/${trackUri}`;

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const unparsedData = await response.json();
    return unparsedData;
  } catch (error) {
    console.error('Error fetching track data:', error);
    return null;
  }
}

async function spotifyProfilePic(userId) {
  // console.log("getSpotifyUserIdUsingAccessToken(accessToken)"); // DEBUG
  // console.log("getSpotifyUserIdUsingAccessToken accessToken ", accessToken); // DEBUG

  accessToken = await getUserAccessToken(userId);
  const url = "https://api.spotify.com/v1/me";
  let profilePic;
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
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
      profilePic = data.images;
    })
    .catch((error) => console.error("Error getting user profile:", error));
  // console.log("userId", userId);
  return profilePic;
}

export {
  createPlaylist,
  getPlaylist,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  searchForTracks,
  getRecentlyPlayedTracks,
  getTrack,
};
