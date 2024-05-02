import { check } from "./base.js";
import { addUser, getUserAccessToken, getUser, checkUser, removeUser, updateUserExpirationUsingNow } from "./users.js";
import { Timestamp } from "firebase/firestore/lite";

// let num = 0;
// while (await checkUser(`test_spotify_id_${num}`)) num++;

// const spotifyId = `test_spotify_id_${num}`;

const spotifyId1 = "test_spotify_id_1";
const spotifyId2 = "test_spotify_id_2";

// console.log("Here 1:" + await checkUser(spotifyId1));

if (await checkUser(spotifyId1))
    await removeUser(spotifyId1);
if (await checkUser(spotifyId2))
  await removeUser(spotifyId2);

await addUser(spotifyId1, {
  access_token: "accessToken",
  app_streak: 5,
  expiration_time: Timestamp.now(),
  friends: ["friend_0", "friend_1"],
  playlist_id: "playlistId",
  refresh_token: "refreshToken",
  snapshot_playlist_id: "snapshotPlaylistId",
  username: "username",
});

await addUser(spotifyId2, {
  access_token: "accessToken",
  app_streak: 5,
  expiration_time: Timestamp.now(),
  friends: ["friend_0", "friend_1"],
  playlist_id: "playlistId",
  refresh_token: "refreshToken",
  snapshot_playlist_id: "snapshotPlaylistId",
  username: "username",
});

// console.log("Here 2:" + await checkUser(spotifyId1));

console.log(`${spotifyId1} =>`, await getUser(spotifyId1));
console.log(`${spotifyId2} =>`, await getUser(spotifyId2));

await removeUser(spotifyId1);
await removeUser(spotifyId2);

// console.log("Here 3:" + await checkUser(spotifyId1));

  