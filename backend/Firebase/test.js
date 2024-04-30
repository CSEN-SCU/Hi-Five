import { setUser, getUserAccessToken, getUser } from "./users.js";
import { Timestamp } from "firebase/firestore/lite";

await setUser("test_spotify_id_1", {
  access_token: "accessToken",
  app_streak: 5,
  expiration_time: Timestamp.now(),
  friends: ["friend_0", "friend_1"],
  playlist_id: "playlistId",
  refresh_token: "refreshToken",
  snapshot_playlist_id: "snapshotPlaylistId",
  username: "username",
});

console.log(await getUser("test_spotify_id_1"));



  