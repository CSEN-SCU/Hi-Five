const express = require('express');
const SpotifyWebApi = require("spotify-web-api-node");

function SearchPlaylistAPI(accTknRefreshments, spotifyAPI, playlistName) 
{
    const router = express.Router();
    router.get("/RecentlyPlayedTracks", accTknRefreshments, (req, res) => {
        const spotifyAPI = new SpotifyWebApi({ accessToken: req.cookies["accTkn"] });

        spotifyApi.searchPlaylists(playlistName)
        .then(function(data) {
            console.log('Found playlists are', data.body);
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    });

    return router;
}

export default SearchPlaylistAPI