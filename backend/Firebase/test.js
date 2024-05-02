import { addUser, getUserAccessToken, getUser, checkUser } from "./users.js";
import { Timestamp } from "firebase/firestore/lite";

let num = 0;
while (await checkUser(`test_spotify_id_${num}`)) num++;

const spotifyId = `test_spotify_id_${num}`;

console.log("Here 1:" + await checkUser(spotifyId));

await addUser(spotifyId, {
  access_token: "accessToken",
  app_streak: 5,
  expiration_time: Timestamp.now(),
  friends: ["friend_0", "friend_1"],
  playlist_id: "playlistId",
  refresh_token: "refreshToken",
  snapshot_playlist_id: "snapshotPlaylistId",
  username: "username",
});

console.log("Here 2:" + await checkUser(spotifyId));

console.log(await getUser(spotifyId));



  