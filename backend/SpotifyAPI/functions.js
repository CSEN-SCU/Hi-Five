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
  console.log("createPlaylist snapshotPlaylistId", snapshotPlaylistId); // DEBUG
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
  // console.log("addTrackToPlaylist trackUri", trackUri); // DEBUG
  // console.log("addTrackToPlaylist(userId, trackUri, playlistId)"); // DEBUG
  // console.log(userId, trackUri, playlistId);
  let accessToken = await refreshAccessToken(userId);
  // if (!trackUri.startsWith('spotify:track:')) {
  //   trackUri = 'spotify:track:' + trackUri;
  // }

  const playlistData = await getPlaylist(userId, playlistId);
  const trackExists = playlistData.tracks.items.some(
    (item) => item.track.uri === trackUri
  );

  if (trackExists) {
    console.log("Track already exists in the playlist.");
    return playlistData.snapshot_id;
  }

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

  // console.log("url, options", url, options); // DEBUG
  let snapshotPlaylistId;
  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      snapshotPlaylistId = data.snapshot_id;
      // console.log("addTrackToPlaylist data", data); // DEBUG
    });

    // console.log("addTrackToPlaylist snapshotPlaylistId", snapshotPlaylistId); // DEBUG
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
 * @returns {JSON} the snapshot playlist id
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
  console.log("removeTrackFromPlaylist trackUri", trackUri); // DEBUG
  // console.log("removeTrackFromPlaylist(userId, trackUri, playlistId, snapshotPlaylistId)"); // DEBUG
  // console.log(userId, trackUri, snapshotPlaylistId);
  let accessToken = await refreshAccessToken(userId);

  // Check if the track exists in the playlist
  const playlistData = await getPlaylist(userId, playlistId);
  const trackExists = playlistData.tracks.items.some(
    (item) => item.track.uri === trackUri
  );

  if (!trackExists) {
    console.log("Track does not exist in the playlist.");
    return playlistData.snapshot_id;
  }

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
  console.log("removeTrackFromPlaylist snapshotPlaylistId", snapshotPlaylistId); // DEBUG
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
 * @param {string} trackId - track ID
 * @returns {JSON} gets the unparsed data of the track
 *
 * Example:
 * track_data = getTrack(user_id, track_id);
 */
async function getTrack(userId, trackId) { // -> trackId
  // console.log("getTrack trackId", trackId); // DEBUG
  // console.log("getTrack trackId", trackId); // DEBUG
  // if (trackId.includes(":")) trackId = trackId.split(':')[2];
  
  // return defaultTrack; // DEBUG
  try {
    let accessToken = await refreshAccessToken(userId);
    const url = `https://api.spotify.com/v1/tracks/${trackId}`;

    // console.log("Track Access Token: ", accessToken);

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      console.log("response", response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const unparsedData = await response.json();
    return unparsedData;
  } catch (error) {
    console.error('Error fetching track data:', error, ' ', trackId);
    return defaultTrack; // DEBUG
    // return null;
  }
}
async function getTracks(userId, trackIds) { // -> trackId
  // console.log("getTrack trackId", trackId); // DEBUG
  // console.log("getTrack trackId", trackId); // DEBUG
  // if (trackId.includes(":")) trackId = trackId.split(':')[2];
  
  // return defaultTrack; // DEBUG
  try {
    if (!trackIds || !Array.isArray(trackIds)) {
      console.error('trackIds is undefined or not an array');
      return;
    }

    let accessToken = await refreshAccessToken(userId);
    const url = `https://api.spotify.com/v1/tracks?ids=${trackIds.join(",")}`;

    // console.log("Track Access Token: ", accessToken);

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      console.log("response", response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const unparsedData = (await response.json()).tracks;
    return unparsedData;
  } catch (error) {
    console.error('Error fetching track data:', error);
    const defaultTracks = Array(trackIds.length).fill(defaultTrack); // DEBUG
    return defaultTracks; // DEBUG
    // return null;
  }
}

async function spotifyProfilePic(userId) {
  let accessToken = await refreshAccessToken(userId); // TODO: force refresh if needed
  // console.log("spotifyProfilePic accessToken ", userId); // DEBUG
  // console.log("spotifyProfilePic accessToken ", accessToken); // DEBUG
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
        console.log("spotifyProfilePic response for", userId, ":", response);
        throw new Error("Failed to get user profile");
      }
      return response.json();
    })
    .then((data) => {
      // console.log("data.id", data.id);
      profilePic = data.images;
    })
    .catch((error) => console.error("Error getting user profile picture:", error));
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
  getTracks,
  spotifyProfilePic,
  defaultTrack,
};

const defaultTrack = {
  "album": {
      "album_type": "single",
      "artists": [
          {
              "external_urls": {
                  "spotify": "https://open.spotify.com/artist/7r8EHfxHZHU16sUV3BEH1t"
              },
              "href": "https://api.spotify.com/v1/artists/7r8EHfxHZHU16sUV3BEH1t",
              "id": "7r8EHfxHZHU16sUV3BEH1t",
              "name": "Macabre Plaza",
              "type": "artist",
              "uri": "spotify:artist:7r8EHfxHZHU16sUV3BEH1t"
          }
      ],
      "available_markets": [
          "AR",
          "AU",
          "AT",
          "BE",
          "BO",
          "BR",
          "BG",
          "CA",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DK",
          "DO",
          "DE",
          "EC",
          "EE",
          "SV",
          "FI",
          "FR",
          "GR",
          "GT",
          "HN",
          "HK",
          "HU",
          "IS",
          "IE",
          "IT",
          "LV",
          "LT",
          "LU",
          "MY",
          "MT",
          "MX",
          "NL",
          "NZ",
          "NI",
          "NO",
          "PA",
          "PY",
          "PE",
          "PH",
          "PL",
          "PT",
          "SG",
          "SK",
          "ES",
          "SE",
          "CH",
          "TW",
          "TR",
          "UY",
          "US",
          "GB",
          "AD",
          "LI",
          "MC",
          "ID",
          "JP",
          "TH",
          "VN",
          "RO",
          "IL",
          "ZA",
          "SA",
          "AE",
          "BH",
          "QA",
          "OM",
          "KW",
          "EG",
          "MA",
          "DZ",
          "TN",
          "LB",
          "JO",
          "PS",
          "IN",
          "BY",
          "KZ",
          "MD",
          "UA",
          "AL",
          "BA",
          "HR",
          "ME",
          "MK",
          "RS",
          "SI",
          "KR",
          "BD",
          "PK",
          "LK",
          "GH",
          "KE",
          "NG",
          "TZ",
          "UG",
          "AG",
          "AM",
          "BS",
          "BB",
          "BZ",
          "BT",
          "BW",
          "BF",
          "CV",
          "CW",
          "DM",
          "FJ",
          "GM",
          "GE",
          "GD",
          "GW",
          "GY",
          "HT",
          "JM",
          "KI",
          "LS",
          "LR",
          "MW",
          "MV",
          "ML",
          "MH",
          "FM",
          "NA",
          "NR",
          "NE",
          "PW",
          "PG",
          "PR",
          "WS",
          "SM",
          "ST",
          "SN",
          "SC",
          "SL",
          "SB",
          "KN",
          "LC",
          "VC",
          "SR",
          "TL",
          "TO",
          "TT",
          "TV",
          "VU",
          "AZ",
          "BN",
          "BI",
          "KH",
          "CM",
          "TD",
          "KM",
          "GQ",
          "SZ",
          "GA",
          "GN",
          "KG",
          "LA",
          "MO",
          "MR",
          "MN",
          "NP",
          "RW",
          "TG",
          "UZ",
          "ZW",
          "BJ",
          "MG",
          "MU",
          "MZ",
          "AO",
          "CI",
          "DJ",
          "ZM",
          "CD",
          "CG",
          "IQ",
          "LY",
          "TJ",
          "VE",
          "ET",
          "XK"
      ],
      "external_urls": {
          "spotify": "https://open.spotify.com/album/6eKaAhAfbKpu15FT8C89g6"
      },
      "href": "https://api.spotify.com/v1/albums/6eKaAhAfbKpu15FT8C89g6",
      "id": "6eKaAhAfbKpu15FT8C89g6",
      "images": [
          {
              "height": 640,
              "url": "https://i.scdn.co/image/ab67616d0000b27365463378aa39c6172a04dc96",
              "width": 640
          },
          {
              "height": 300,
              "url": "https://i.scdn.co/image/ab67616d00001e0265463378aa39c6172a04dc96",
              "width": 300
          },
          {
              "height": 64,
              "url": "https://i.scdn.co/image/ab67616d0000485165463378aa39c6172a04dc96",
              "width": 64
          }
      ],
      "name": "Out With the Old in With the Taboo",
      "release_date": "2022-04-21",
      "release_date_precision": "day",
      "total_tracks": 5,
      "type": "album",
      "uri": "spotify:album:6eKaAhAfbKpu15FT8C89g6"
  },
  "artists": [
      {
          "external_urls": {
              "spotify": "https://open.spotify.com/artist/7r8EHfxHZHU16sUV3BEH1t"
          },
          "href": "https://api.spotify.com/v1/artists/7r8EHfxHZHU16sUV3BEH1t",
          "id": "7r8EHfxHZHU16sUV3BEH1t",
          "name": "Macabre Plaza",
          "type": "artist",
          "uri": "spotify:artist:7r8EHfxHZHU16sUV3BEH1t"
      }
  ],
  "available_markets": [
      "AR",
      "AU",
      "AT",
      "BE",
      "BO",
      "BR",
      "BG",
      "CA",
      "CL",
      "CO",
      "CR",
      "CY",
      "CZ",
      "DK",
      "DO",
      "DE",
      "EC",
      "EE",
      "SV",
      "FI",
      "FR",
      "GR",
      "GT",
      "HN",
      "HK",
      "HU",
      "IS",
      "IE",
      "IT",
      "LV",
      "LT",
      "LU",
      "MY",
      "MT",
      "MX",
      "NL",
      "NZ",
      "NI",
      "NO",
      "PA",
      "PY",
      "PE",
      "PH",
      "PL",
      "PT",
      "SG",
      "SK",
      "ES",
      "SE",
      "CH",
      "TW",
      "TR",
      "UY",
      "US",
      "GB",
      "AD",
      "LI",
      "MC",
      "ID",
      "JP",
      "TH",
      "VN",
      "RO",
      "IL",
      "ZA",
      "SA",
      "AE",
      "BH",
      "QA",
      "OM",
      "KW",
      "EG",
      "MA",
      "DZ",
      "TN",
      "LB",
      "JO",
      "PS",
      "IN",
      "BY",
      "KZ",
      "MD",
      "UA",
      "AL",
      "BA",
      "HR",
      "ME",
      "MK",
      "RS",
      "SI",
      "KR",
      "BD",
      "PK",
      "LK",
      "GH",
      "KE",
      "NG",
      "TZ",
      "UG",
      "AG",
      "AM",
      "BS",
      "BB",
      "BZ",
      "BT",
      "BW",
      "BF",
      "CV",
      "CW",
      "DM",
      "FJ",
      "GM",
      "GE",
      "GD",
      "GW",
      "GY",
      "HT",
      "JM",
      "KI",
      "LS",
      "LR",
      "MW",
      "MV",
      "ML",
      "MH",
      "FM",
      "NA",
      "NR",
      "NE",
      "PW",
      "PG",
      "PR",
      "WS",
      "SM",
      "ST",
      "SN",
      "SC",
      "SL",
      "SB",
      "KN",
      "LC",
      "VC",
      "SR",
      "TL",
      "TO",
      "TT",
      "TV",
      "VU",
      "AZ",
      "BN",
      "BI",
      "KH",
      "CM",
      "TD",
      "KM",
      "GQ",
      "SZ",
      "GA",
      "GN",
      "KG",
      "LA",
      "MO",
      "MR",
      "MN",
      "NP",
      "RW",
      "TG",
      "UZ",
      "ZW",
      "BJ",
      "MG",
      "MU",
      "MZ",
      "AO",
      "CI",
      "DJ",
      "ZM",
      "CD",
      "CG",
      "IQ",
      "LY",
      "TJ",
      "VE",
      "ET",
      "XK"
  ],
  "disc_number": 1,
  "duration_ms": 96363,
  "explicit": false,
  "external_ids": {
      "isrc": "TCAGE2226176"
  },
  "external_urls": {
      "spotify": "https://open.spotify.com/track/49Q4EjrGxgllOt6jXJPfeI"
  },
  "href": "https://api.spotify.com/v1/tracks/49Q4EjrGxgllOt6jXJPfeI",
  "id": "49Q4EjrGxgllOt6jXJPfeI",
  "is_local": false,
  "name": "Abandoned Plaza",
  "popularity": 56,
  "preview_url": "https://p.scdn.co/mp3-preview/2c08c5c6325fb502aa4b94c3880f06095114b22d?cid=1afd86bd959b46549fad0dc7389b1f1a",
  "track_number": 1,
  "type": "track",
  "uri": "spotify:track:49Q4EjrGxgllOt6jXJPfeI"
};
