import { add, get, update, check, remove } from "./base.js";
import { Timestamp } from "firebase/firestore/lite";

const usersCollection = "users";

// TODO: If needed, also check friends values
// TODO: If needed, type check

// Template fields:
// {
//   access_token: accessToken,
//   app_streak: appStreak,
//   expiration_time: expirationTime,
//   friends: friends,
//   playlist_id: playlistId,
//   refresh_token: refreshToken,
//   snapshot_playlist_id: snapshotPlaylistId,
//   username: username
// }

// General functions:

async function checkUser(spotifyId) {
  return await check(usersCollection, spotifyId);
}

async function addUser(spotifyId, fields) {
  await add(usersCollection, spotifyId, fields);
}

async function getUser(spotifyId, field) {
  return await get(usersCollection, spotifyId, field);
}

async function updateUser(spotifyId, fields) {
  await update(usersCollection, spotifyId, fields);
}

async function removeUser(spotifyId) {
  await remove(usersCollection, spotifyId);
}

// Specific functions:

async function getUserAccessToken(spotifyId) {
  return await getUser(spotifyId, "access_token");
}

async function getUserAppStreak(spotifyId) {
  return await getUser(spotifyId, "app_streak");
}

async function getUserExpirationTime(spotifyId) {
  return await getUser(spotifyId, "expiration_time");
}

async function getUserFriends(spotifyId) {
  return await getUser(spotifyId, "friends");
}

async function getUserPlaylistId(spotifyId) {
  return await getUser(spotifyId, "playlist_id");
}

async function getUserRefreshToken(spotifyId) {
  return await getUser(spotifyId, "refresh_token");
}

async function getUserSnapshotPlaylistId(spotifyId) {
  return await getUser(spotifyId, "snapshot_playlist_id");
}

async function getUserUsername(spotifyId) {
  return await getUser(spotifyId, "username");
}

async function updateUserAccessToken(spotifyId, accessToken) {
  await updateUser(spotifyId, { access_token: accessToken });
}

async function updateUserAppStreak(spotifyId, appStreak) {
  await updateUser(spotifyId, { app_streak: appStreak });
}

async function updateUserExpirationUsingNow(spotifyId, expirationTime) {
  let timestamp =  Timestamp.now();
  timestamp = new Timestamp(timestamp.seconds + expirationTime, timestamp.nanoseconds);
  await updateUser(spotifyId, { expiration_time: timestamp });
}

async function updateUserExpirationTime(spotifyId, expirationTime) {
  await updateUser(spotifyId, { expiration_time: expirationTime }); // Timestamp.now() + 
}

async function updateUserFriends(spotifyId, friends) {
  await updateUser(spotifyId, { friends: friends });
}

async function updateUserPlaylistId(spotifyId, playlistId) {
  await updateUser(spotifyId, { playlist_id: playlistId });
}

async function updateUserRefreshToken(spotifyId, refreshToken) {
  await updateUser(spotifyId, { refresh_token: refreshToken });
}

async function updateUserSnapshotPlaylistId(spotifyId, snapshotPlaylistId) {
  await updateUser(spotifyId, { snapshot_playlist_id: snapshotPlaylistId });
}

async function updateUserUsername(spotifyId, username) {
  await updateUser(spotifyId, { username: username });
}

export {
  checkUser,
  addUser,
  getUser,
  updateUser,
  removeUser,
  getUserAccessToken,
  getUserAppStreak,
  updateUserExpirationUsingNow,
  getUserExpirationTime,
  getUserFriends,
  getUserPlaylistId,
  getUserRefreshToken,
  getUserSnapshotPlaylistId,
  getUserUsername,
  updateUserAccessToken,
  updateUserAppStreak,
  updateUserExpirationTime,
  updateUserFriends,
  updateUserPlaylistId,
  updateUserRefreshToken,
  updateUserSnapshotPlaylistId,
  updateUserUsername,
  Timestamp,
};
