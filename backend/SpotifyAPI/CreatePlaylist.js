const express = require('express');
const SpotifyWebApi = require("spotify-web-api-node");

function CreatePlaylistAPI(accTknRefreshments) 
{
    const router = express.Router();
    router.get("/CreatePlaylist", accTknRefreshments, (req, res) => {
        const spotifyAPI = new SpotifyWebApi({ accessToken: req.cookies["accTkn"] });

        
        spotifyAPI.createPlaylist('Hi-Fived Songs', { 'description': 'Hi-Five\'s custom playlist', 'public': true })
            .then(function(data) {
                console.log('Created playlist!');
            }, function(err) {
                console.log('Something went wrong!', err);
            });
    });

    return router;
}

module.exports = {CreatePlaylistAPI};