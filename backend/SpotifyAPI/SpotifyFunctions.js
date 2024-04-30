//Requires these scopes:
//    playlist-modify-public
//    playlist-modify-private
//    user-read-recently-played
//    user-library-read
//    user-library-write

import { getUserAccessToken} from '../Firebase/users.js' 

//This will create a playlist and ensure that there is a user)id
async function createPlaylist(user_id) {
  access_token = getUserAccessToken(user_id);
  unparsed_data = NULL;
  const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;

  const options = {
    headers: {
      "Authorization": `Bearer ${access_token}`,
    },
    data: {
      "name": "Hi-Five Playlist",
      "description": "A playlist that Hi-Five has made",
      "public": false,
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      unparsed_data = data;
      console.log(data);
    });
}

async function getPlaylist(user_id, playlist_id) {
  access_token = getUserAccessToken(user_id);
  unparsed_data = NULL;
  const url = `https://api.spotify.com/v1/playlists/${playlist_id}`;

    const options = {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    };

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      unparsed_data = data;
      console.log(data);
    });
}

async function addMusicToPlaylist(user_id, song_id) {
  access_token = getUserAccessToken(user_id);
  unparsed_data = NULL;
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

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      unparsed_data = data;
      console.log(data);
    });
}

async function deleteTrackFromPlaylist(user_id, song_id, snapshot) {
  access_token = getUserAccessToken(user_id);
  unparsed_data = NULL;
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

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      unparsed_data = data;
      console.log(data);
    });
}

//
async function findSongAndArtists(user_id)
{ 
    access_token = getUserAccessToken(user_id);
    unparsed_data = NULL;
    const type = "track"; // Specify the type of search (e.g., 'track', 'artist', 'album')

    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=${type}`;

    const options = {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        unparsed_data = data;
        console.log(data);
      });
}

//scope: user-read-recently-played
async function recentlyPlayedTracks(user_id) {
  access_token = getUserAccessToken(user_id);
  unparsed_data = NULL;

  const url = `https://api.spotify.com/v1/me/player/recently-played`;

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      unparsed_data = data;
      console.log(data);
    });
}

async function getTrack(user_id, track_id) {
  access_token = getUserAccessToken(user_id);
  unparsed_data = NULL;
  const url = `https://api.spotify.com/v1/tracks/${track_id}`;

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      unparsed_data = data;
      console.log(data);
    });
}

export {createPlaylist, getPlaylist, addMusicToPlaylist, deleteTrackFromPlaylist, findSongAndArtists, recentlyPlayedTracks, getTrack}

