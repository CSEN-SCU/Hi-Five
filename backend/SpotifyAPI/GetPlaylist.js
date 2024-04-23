import express from 'express';
import SpotifyWebApi from "spotify-web-api-node";

function GetPlaylistAPI(accTknRefreshments, playlistID)
{
    const router = express.Router();
    router.get("/GetPlaylist", accTknRefreshments, (req, res) => {

        const spotifyAPI = new SpotifyWebApi({ accessToken: req.cookies["accTkn"] });

        // query Spotify's top tracks endpoint for a user API, with a max track count of count and time range
        // extended over the user's entire account
        spotifyAPI.getPlaylist(playlistID)
            .then(function(data) {
                console.log('Some information about this playlist', data.body);
            }, function(err) {
                console.log('Something went wrong!', err);
            });
    });
    return router;
}

export {GetPlaylistAPI};