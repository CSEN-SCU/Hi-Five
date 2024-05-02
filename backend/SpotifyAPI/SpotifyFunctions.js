//Requires these scopes:
//    playlist-modify-public
//    playlist-modify-private
//    user-read-recently-played
//    user-library-read
//    user-library-write

import { getUserAccessToken } from '../Firebase/users.js' 

//this method is to get the spotify_id by utilizing the access token. This is done in the authorization phase in
//order to get the key(spotify_id) in order to store the access token

async function getSpotifyID(access_token)
{
    const url = "https://api.spotify.com/v1/me";
    var spotifyId;

    const options = {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + access_token,
      },
    };
    console.log("YOLOOOOOOOOO");

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
      console.log("Spotify ID:", spotifyName);
      // Do something with the Spotify ID
    })
    .catch((error) => console.error("Error getting user name:", error));

  return spotifyName;
}

//This will create a playlist and ensure that there is a user)id
async function createPlaylist(user_id) {
  const access_token = await getUserAccessToken(user_id);
  var unparsed_data = NULL;
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

  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      unparsed_data = data;
      console.log(data);
    });

    return unparsed_data;
}

async function getPlaylist(user_id, playlist_id) {
  const access_token = await getUserAccessToken(user_id);
  var unparsed_data = NULL;
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

async function addMusicToPlaylist(user_id, song_id) {
  const access_token = await getUserAccessToken(user_id);
  var unparsed_data = NULL;
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
  const access_token = await getUserAccessToken(user_id);
  var unparsed_data = NULL;
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
    const access_token = await getUserAccessToken(user_id);
    var unparsed_data = NULL;
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
  const access_token = await getUserAccessToken(user_id);
  var unparsed_data = NULL;

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
  access_token = await getUserAccessToken(user_id);
  unparsed_data = NULL;
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

