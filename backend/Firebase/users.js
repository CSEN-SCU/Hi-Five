import { add, get, update, check, remove } from "./base.js";
import { Timestamp } from "firebase/firestore/lite";

const usersCollection = "users";

// TODO: If needed, also check following values
// TODO: If needed, type check

// Template fields:
// {
//   access_token: accessToken,
//   app_streak: appStreak,
//   expiration_time: expirationTime,
//   following: followings,
//   playlist_id: playlistId,
//   refresh_token: refreshToken,
//   snapshot_playlist_id: snapshotPlaylistId,
//   username: username
// }

// General functions:

async function checkUser(userId) {
  return await check(usersCollection, userId);
}

async function addUser(userId, fields) {
  await add(usersCollection, userId, fields);
}

async function getUsers() {
  return await get(usersCollection);
}

async function getUser(userId, field) {
  return await get(usersCollection, userId, field);
}

async function updateUser(userId, fields) {
  await update(usersCollection, userId, fields);
}

async function removeUser(userId, field) {
  await remove(usersCollection, userId, field);
}

// Specific functions:

async function getUserAccessToken(userId) {
  return await getUser(userId, "access_token");
}

async function getUserAppStreak(userId) {
  return await getUser(userId, "app_streak");
}

async function getUserExpirationTime(userId) {
  return await getUser(userId, "expiration_time");
}

async function getUserFollowing(userId) {
  return await getUser(userId, "following");
}

async function getUserPlaylistId(userId) {
  return await getUser(userId, "playlist_id");
}

async function getUserRefreshToken(userId) {
  return await getUser(userId, "refresh_token");
}

async function getUserSnapshotPlaylistId(userId) {
  return await getUser(userId, "snapshot_playlist_id");
}

async function getUserUsername(userId) {
  return await getUser(userId, "username");
}

async function updateUserAccessToken(userId, accessToken) {
  await updateUser(userId, { access_token: accessToken });
}

async function updateUserAppStreak(userId, appStreak) {
  await updateUser(userId, { app_streak: appStreak });
}

async function updateUserExpirationTime(userId, expirationTime) {
  await updateUser(userId, { expiration_time: expirationTime }); // Timestamp.now() + 
}

async function updateUserFollowing(userId, following) {
  await updateUser(userId, { following: following });
}

async function updateUserPlaylistId(userId, playlistId) {
  await updateUser(userId, { playlist_id: playlistId });
}

async function updateUserRefreshToken(userId, refreshToken) {
  await updateUser(userId, { refresh_token: refreshToken });
}

async function updateUserSnapshotPlaylistId(userId, snapshotPlaylistId) {
  await updateUser(userId, { snapshot_playlist_id: snapshotPlaylistId });
}

async function updateUserUsername(userId, username) {
  await updateUser(userId, { username: username });
}

// TODO: Specialized functions

async function addUserUsingAuthorizationCode(userId, username, data) {
  console.log("addUserUsingAuthorizationCode data", data)
  let now =  Timestamp.now();
  let accessToken = data["access_token"];
  let expiresIn = data["expires_in"] * 1000;
  let refreshToken = data["refresh_token"];
  await addUser(userId, {
    access_token: accessToken,
    app_streak: 5,
    expiration_time: new Timestamp(now.seconds + expiresIn, now.nanoseconds),
    friends: [],
    playlist_id: "",
    refresh_token: refreshToken,
    snapshot_playlist_id: "",
    username: username,
  });
}

async function updateUserExpirationUsingNow(userId, expirationTime) {
  let now =  Timestamp.now();
  await updateUser(userId, { expiration_time: new Timestamp(now.seconds + expirationTime, now.nanoseconds) });
}

export {
  checkUser,
  addUser,
  getUsers,
  getUser,
  updateUser,
  removeUser,
  getUserAccessToken,
  getUserAppStreak,
  getUserExpirationTime,
  getUserFollowing,
  getUserPlaylistId,
  getUserRefreshToken,
  getUserSnapshotPlaylistId,
  getUserUsername,
  updateUserAccessToken,
  updateUserAppStreak,
  updateUserExpirationTime,
  updateUserFollowing,
  updateUserPlaylistId,
  updateUserRefreshToken,
  updateUserSnapshotPlaylistId,
  updateUserUsername,
  Timestamp,
  addUserUsingAuthorizationCode,
  updateUserExpirationUsingNow
};
