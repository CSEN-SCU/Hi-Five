import { add, get, update, check } from "./base.js";
import { Timestamp } from "firebase/firestore/lite";

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
  return await check("users", spotifyId);
}

async function addUser(spotifyId, fields) {
  await add("users", spotifyId, fields);
}

async function getUser(spotifyId, field) {
  return field
    ? await get("users", spotifyId, field)
    : await get("users", spotifyId);
}

async function updateUser(spotifyId, fields) {
  await update("users", spotifyId, fields);
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

async function updateUserExpirationTime(spotifyId, expirationTime) {
  await updateUser(spotifyId, {
    expiration_time: Timestamp.now() + expirationTime,
  });
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
  getUserAccessToken,
  getUserAppStreak,
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
