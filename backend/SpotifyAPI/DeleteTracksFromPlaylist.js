const express = require('express');
const SpotifyWebApi = require("spotify-web-api-node");

function DeleteTracksFromPlaylistAPI(playlistId, tracks, options, accTknRefreshments) 
{
    const router = express.Router();
    router.get("/DeleteTracksFromPlaylist", accTknRefreshments, (req, res) => {
        const spotifyAPI = new SpotifyWebApi({ accessToken: req.cookies["accTkn"] });

        spotifyAPI.removeTracksFromPlaylist(playlistId, tracks, options)
        .then(function(data) {
            console.log('Tracks removed from playlist!');
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    });

    return router;
}

module.exports = {DeleteTracksFromPlaylistAPI};