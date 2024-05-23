import { check } from "./base.js";
import { addUser, getUserAccessToken, getUser, checkUser, removeUser, updateUserExpirationUsingNow } from "./users.js";
import { Timestamp } from "firebase/firestore/lite";

// let num = 0;
// while (await checkUser(`test_user_id_${num}`)) num++;

// const spotifyId = `test_user_id_${num}`;

const userId1 = "test_user_id_2";
const userId2 = "test_user_id_3";

if (await checkUser(userId1))
    await removeUser(userId1);
if (await checkUser(userId2))
  await removeUser(userId2);

await addUser(userId1, {
  access_token: "accessToken",
  app_streak: 5,
  expiration_time: Timestamp.now(),
  following: ["friend_0", "friend_1"],
  playlist_id: "playlistId",
  refresh_token: "refreshToken",
  snapshot_playlist_id: "snapshotPlaylistId",
  username: "username",
});

await addUser(userId2, {
  access_token: "accessToken",
  app_streak: 5,
  expiration_time: Timestamp.now(),
  following: ["friend_0", "friend_1"],
  playlist_id: "playlistId",
  refresh_token: "refreshToken",
  snapshot_playlist_id: "snapshotPlaylistId",
  username: "username",
});

// console.log("Here 2:" + await checkUser(userId1));

console.log(`${userId1} =>`, await getUser(userId1));
console.log(`${userId2} =>`, await getUser(userId2));

await removeUser(userId1);
await removeUser(userId2);

// console.log("Here 3:" + await checkUser(userId1));