console.log("SpotifyFunctions.js");

//Requires these scopes:
//    playlist-modify-public
//    playlist-modify-private
//    user-read-recently-played
//    user-library-read
//    user-library-write

import { getUserAccessToken, updateUserPlaylistId, updateUserSnapshotPlaylistId } from '../Firebase/users.js' 
import { refreshAccessToken } from './authentication.js';

/**
 * Function Name: getGlobalID
 * Description: This function gets the spotify user ID by accessing the global variable.
 *
 * @returns {string} the spotify ID of the user
 *
 * Example:
 * id = getGlobalID();
 */
async function getGlobalID()
{
  var spotifyId;

  await fetch('http://localhost:3000/id')
  .then((response) => {
        if (!response.ok) {
        throw new Error("Failed to get user profile");
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
        spotifyId = data.global_user_id;
        console.log("Spotify ID:", spotifyId);
        // Do something with the Spotify ID
    })
    .catch((error) => console.error("Error getting user profile:", error));
  console.log(typeof spotifyId);
  return spotifyId;
}

/**
 * Function Name: getSpotifyID
 * Description: This function gets the spotify user ID by using the access-token.
 *
 * @param {string} access_token - The spotify access-token
 * @returns {string} the spotify ID of the user
 *
 * Example:
 * id = getSpotifyID(access_token);
 */
async function getSpotifyID(access_token)
{
    console.log("getSpotifyID(access_token)"); // DEBUG
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
        throw new Error("Failed to get user profile");
        }
        return response.json();
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

/**
 * Function Name: getUserName
 * Description: This function gets the username by using the access-token.
 *
 * @param {string} access_token - The spotify access-token
 * @returns {string} the username of the user
 *
 * Example:
 * id = getUserName(access_token);
 */
async function getUserName(access_token) {
  const url = "https://api.spotify.com/v1/me";
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
      console.log("Spotify name:", spotifyName);
      // Do something with the Spotify ID
    })
    .catch((error) => console.error("Error getting user name:", error));

  

  return spotifyName;
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
async function isValidPlaylist(user_id, playlistId) {
  const access_token = await refreshAccessToken(user_id);
  const headers = {
      'Authorization': `Bearer ${access_token}`
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
async function createPlaylist(user_id) {
  console.log("createPlaylist(user_id)"); // DEBUG
  console.log(`user_id: ${user_id}`);

  const access_token = await refreshAccessToken(user_id);
  var unparsed_data = null;
  const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;

  const options = {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${access_token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    "name": "Hi-Five Playlist",
    "description": "A playlist that Hi-Five has made",
    "public": false,
  }),
};

  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      unparsed_data = data;
      // console.log(data);
    });
  
  updateUserPlaylistId(user_id, unparsed_data.id);
  updateUserSnapshotPlaylistId(user_id, unparsed_data.snapshot_id);

  return unparsed_data;
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
async function getPlaylist(user_id, playlist_id) {
  console.log("getPlaylist(user_id, playlist_id)"); // DEBUG
  const access_token = await refreshAccessToken(user_id);
  var isValid = await isValidPlaylist(user_id, playlist_id);
  if (!isValid)
  {
    await createPlaylist(user_id);
    playlist_id = await getUserPlaylistId(user_id);
  }
  
  var unparsed_data = null;
  const url = `https://api.spotify.com/v1/playlists/${playlist_id}`;

    const options = {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    };

  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      unparsed_data = data;
      console.log(data);
    });

    return unparsed_data;
}

/**
 * Function Name: addMusicToPlaylist
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
async function addMusicToPlaylist(user_id, song_uri, playlist_id) {
  console.log("addMusicToPlaylist(user_id, song_uri, playlist_id)"); // DEBUG
  console.log(user_id, song_uri, playlist_id);
  const access_token = await refreshAccessToken(user_id);
  var unparsed_data = null;
  const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;

  const options = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "uris": [song_uri],
      "position": 0,
    }),
  };

  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      unparsed_data = data;
      console.log(data);
    });
  
  updateUserSnapshotPlaylistId(user_id, unparsed_data.snapshot_id)

  return unparsed_data.snapshot_id;
}

/**
 * Function Name: deleteTrackFromPlaylist
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
async function deleteTrackFromPlaylist(user_id, playlist_id ,song_uri, snapshot) {
  console.log("deleteTrackFromPlaylist(user_id, song_uri, snapshot)"); // DEBUG
  console.log(user_id, song_uri, snapshot);
  const access_token = await refreshAccessToken(user_id);
  var unparsed_data = null;
  const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({"tracks": [
      {
        "uri": song_uri,
      },
    ],
    "snapshot_id": snapshot})
  };

  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      unparsed_data = data;
      console.log(data);
    });
  
    updateUserSnapshotPlaylistId(user_id, unparsed_data.snapshot_id)

    return unparsed_data;
}

/**
 * Function Name: findSongAndArtists
 * Description: This function searches for a song.
 *
 * @param {string} user_id - user ID
 * @param {string} searchTerm - song name or part of a song name
 * @returns {JSON} the unparsed data of the searched tracks
 *
 * Example:
 * search_list = findSongAndArtists(user_id, searchTerm);
 */
async function findSongAndArtists(user_id, searchTerm)
{ 
  console.log("findSongAndArtists(user_id)"); // DEBUG
    const access_token = await refreshAccessToken(user_id);
    var unparsed_data = null;
    const type = "track"; // Specify the type of search (e.g., 'track', 'artist', 'album')

    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=${type}`;

    const options = {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    };

    await fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        unparsed_data = data;
        console.log(data);
      });
    
    return unparsed_data;
}

/**
 * Function Name: recentlyPlayedTracks
 * Description: This function gets the most recently played tracks.
 *
 * @param {string} user_id - user ID
 * @returns {JSON} the unparsed data of the 20 most recently played tracks
 *
 * Example:
 * recently_played_songs = recentlyPlayedTracks(user_id);
 */
async function recentlyPlayedTracks(user_id) {
  console.log("recentlyPlayedTracks(user_id)"); // DEBUG
  const access_token = await refreshAccessToken(user_id);
  var unparsed_data = null;

  const url = `https://api.spotify.com/v1/me/player/recently-played`;

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      unparsed_data = data;
      console.log(data);
    });

    return unparsed_data;
}

/**
 * Function Name: getTrack
 * Description: This function gets the track based on the track ID.
 *
 * @param {string} user_id - user ID
 * @param {string} track_id - track ID
 * @returns {JSON} gets the unparsed data of the track
 *
 * Example:
 * track_data = getTrack(user_id, track_id);
 */
async function getTrack(user_id, track_id) {
  console.log("getTrack(user_id, track_id)"); // DEBUG
  const access_token = await refreshAccessToken(user_id);
  var unparsed_data = null;
  const url = `https://api.spotify.com/v1/tracks/${track_id}`;

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      unparsed_data = data;
      console.log(data);
    });

    return unparsed_data;
}

export {
  getGlobalID,
  getSpotifyID,
  createPlaylist,
  getPlaylist,
  addMusicToPlaylist,
  deleteTrackFromPlaylist,
  findSongAndArtists,
  recentlyPlayedTracks,
  getTrack,
  getUserName
};

