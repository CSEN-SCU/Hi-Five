console.log("SpotifyFunctions.js");

//Requires these scopes:
//    playlist-modify-public
//    playlist-modify-private
//    user-read-recently-played
//    user-library-read
//    user-library-modify

import { getUser, getUserAccessToken, updateUserPlaylistId, getUserPlaylistId } from '../Firebase/users.js' 
import { refreshAccessToken } from './auth.js';

//this method is to get the spotify_id by utilizing the access token. This is done in the authorization phase in
//order to get the key(spotify_id) in order to store the access token

//This will create a playlist and ensure that there is a user)id
async function createPlaylist(user_id) {
  refreshAccessToken(user_id);
  console.log("createPlaylist(user_id)"); // DEBUG
  // if (getPlaylist(user_id) !== null) {
  //   console.log("User already has a playlist");
  //   return null;
  // }
  const access_token = await getUserAccessToken(user_id);
  var unparsed_data = null;
  const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;

  const options = {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${access_token}`,
      'Content-Type': 'application/json'
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
      console.log(data);
    });

    if (unparsed_data.id === null) {
      console.log("Error in createPlaylist");
      return null;
    }

    updateUserPlaylistId(user_id, unparsed_data.id);
    return unparsed_data.id;
}

async function getPlaylist(user_id/*, playlist_id*/) {
  refreshAccessToken(user_id);
  console.log("getPlaylist(user_id, playlist_id)"); // DEBUG
  const access_token = await getUserAccessToken(user_id);
  let playlist_id = getUserPlaylistId(user_id);
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

    if (unparsed_data.error) {
      console.log("Error in getPlaylist");
      return null;
    }

    return unparsed_data;
}

async function addMusicToPlaylist(user_id, song_id) {
  refreshAccessToken(user_id);
  console.log("addMusicToPlaylist(user_id, song_id)"); // DEBUG
  const access_token = await getUserAccessToken(user_id);
  var unparsed_data = null;
  const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body: {
      uris: [song_id],
      position: 0,
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

async function deleteTrackFromPlaylist(user_id, song_id, snapshot) {
  refreshAccessToken(user_id);
  console.log("deleteTrackFromPlaylist(user_id, song_id, snapshot)"); // DEBUG
  const access_token = await getUserAccessToken(user_id);
  var unparsed_data = null;
  const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body: {
      tracks: [
        {
          uri: song_id,
        },
      ],
      snapshot_id: snapshot,
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

//
async function findSongAndArtists(user_id)
{ 
  refreshAccessToken(user_id);
  console.log("findSongAndArtists(user_id)"); // DEBUG
    const access_token = await getUserAccessToken(user_id);
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

//scope: user-read-recently-played
async function recentlyPlayedTracks(user_id) {
  refreshAccessToken(user_id);
  console.log("recentlyPlayedTracks(user_id)"); // DEBUG
  const access_token = await getUserAccessToken(user_id);
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

async function getTrack(user_id, track_id) {
  refreshAccessToken(user_id);
  console.log("getTrack(user_id, track_id)"); // DEBUG
  access_token = await getUserAccessToken(user_id);
  unparsed_data = null;
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
  // getSpotifyID,
  createPlaylist,
  getPlaylist,
  addMusicToPlaylist,
  deleteTrackFromPlaylist,
  findSongAndArtists,
  recentlyPlayedTracks,
  getTrack
};

