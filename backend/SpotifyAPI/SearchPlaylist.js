import express from 'express';
import SpotifyWebApi from "spotify-web-api-node";

function SearchPlaylistAPI(accTknRefreshments, playlistName) {
    const router = express.Router();
    router.get("/RecentlyPlayedTracks", accTknRefreshments, (req, res) => {
        const spotifyAPI = new SpotifyWebApi({ accessToken: req.cookies["accTkn"] });

        spotifyAPI.searchPlaylists(playlistName)
            .then(function (data) {
                console.log('Found playlists are', data.body);
            }, function (err) {
                console.log('Something went wrong!', err);
            });
    });

    return router;
}

export { SearchPlaylistAPI };