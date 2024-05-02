import { addUser, getUserAccessToken, getUser, checkUser } from "./users.js";
import { Timestamp } from "firebase/firestore/lite";

console.log("Here 1:" + await checkUser("test_spotify_id_1"));

await addUser("test_spotify_id_2", {
  access_token: "accessToken",
  app_streak: 5,
  expiration_time: Timestamp.now(),
  friends: ["friend_0", "friend_1"],
  playlist_id: "playlistId",
  refresh_token: "refreshToken",
  snapshot_playlist_id: "snapshotPlaylistId",
  username: "username",
});

console.log("Here 2:" + await checkUser("test_spotify_id_1"));

console.log(await getUser("test_spotify_id_1"));



  