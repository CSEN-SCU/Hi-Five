const express = require('express');
const SpotifyWebApi = require("spotify-web-api-node");

function RecentlyPlayedTracksAPI(accTknRefreshments, numOfTracks) 
{
    const router = express.Router();
    router.get("/RecentlyPlayedTracks", accTknRefreshments, (req, res) => {
        const spotifyAPI = new SpotifyWebApi({ accessToken: req.cookies["accTkn"] });

        spotifyApi.getMyRecentlyPlayedTracks({
            limit : numOfTracks
        }).then(function(data) {
            // Output items
            console.log("Your 20 most recently played tracks are:");
            data.body.items.forEach(item => console.log(item.track));
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    });

    return router;
}

export default RecentlyPlayedTracksAPI