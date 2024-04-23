import express from 'express';
import SpotifyWebApi from "spotify-web-api-node";

function AddMusicToPlaylistAPI(accTknRefreshments, playlistID, tracksID) {
    const router = express.Router();
    router.get("/AddMusicToPlaylist", accTknRefreshments, (req, res) => {

        // query Spotify's top tracks endpoint for a user API, with a max track count of count and time range
        // extended over the user's entire account
        const spotifyAPI = new SpotifyWebApi({ accessToken: req.cookies["accTkn"] });


        spotifyAPI.addTracksToPlaylist(playlistID, tracksID)
            .then(function (data) {
                console.log('Added tracks to playlist!');
            }, function (err) {
                console.log('Something went wrong!', err);
            });
    });

    return router;
}

export { AddMusicToPlaylistAPI };