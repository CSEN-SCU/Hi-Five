console.log("test.js");
import { getUserAccessToken, getUserUsername, getUserPlaylistId } from '../Firebase/users.js';
import { global_user_id, refreshAccessToken, getUserName, getSpotifyIdFromAccessToken } from './auth.js'
import { createPlaylist, getPlaylist, addMusicToPlaylist, deleteTrackFromPlaylist, findSongAndArtists, recentlyPlayedTracks, getTrack } from './SpotifyFunctions.js'

async function testRoute(app) {
    console.log("testRoute(app)"); // DEBUG
    app.get("/test", async (req, res) => {

        await createPlaylist(global_user_id);
        console.log(await getUserPlaylistId(global_user_id));




        // console.log(`app.get("/test"...`); // DEBUG
        // console.log(`>${getUserAccessToken(global_user_id)}<`); // DEBUG
        // res.json(
        //     {"getUserUsername(global_user_id)": await getUserUsername(global_user_id),
        //     "getUserName(global_user_id)": await getUserName(global_user_id)}
        // );
    });
}

export { testRoute };