const express = require('express');
const SpotifyWebApi = require("spotify-web-api-node");

function FindSongAndArtistsAPI(accTknRefreshments, spotifyAPI, trackName, artistName) 
{
    const router = express.Router();
    router.get("/FindSongAndArtists", accTknRefreshments, (req, res) => {
        const spotifyAPI = new SpotifyWebApi({ accessToken: req.cookies["accTkn"] });

        
        spotifyApi.searchTracks(`track:${trackName} artist:${artistName}`)
        .then(function(data) {
            console.log(`Search tracks by "${trackName}" in the track name and "${artistName}" in the artist name`, data.body);
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    });

    return router;
}

export default FindSongAndArtistsAPI