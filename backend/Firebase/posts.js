import { add, get, update, check, remove } from "./base.js";
import { Timestamp } from "firebase/firestore/lite";
import { generateRandomString } from "../SpotifyAPI/authentication.js"

const postsCollection = "posts";

// TODO: If needed, also check post_id values
// TODO: If needed, type check

// General functions:

async function checkPost(spotifyId) {
  return await check(postsCollection, spotifyId);
}

async function addPost(spotifyId, fields) {
  await add(postsCollection, spotifyId, fields);
}

async function getPosts() {
  return await get(postsCollection);
}

async function getPost(spotifyId, field) {
  return await get(postsCollection, spotifyId, field);
}

async function updatePost(spotifyId, fields) {
  await update(postsCollection, spotifyId, fields);
}

async function removePost(spotifyId, field) {
  await remove(postsCollection, spotifyId, field);
}

// TODO: Specialized functions

async function addPostId(spotifyId, trackId) {
  while ((await getPostIdCount(spotifyId)) >= 14) {
    await removeOldestPostId(spotifyId);
  }
  const postIdKeys = Object.keys(await getPost(spotifyId));
  let newPostId;
  do {
    newPostId = generateRandomString(6);
  } while (postIdKeys.includes(newPostId));
  await updatePost(spotifyId, { [newPostId]: { date: Timestamp.now(), track_id: trackId } });
}

async function getPostIdCount(spotifyId) {
  return Object.keys(await getPost(spotifyId)).length;
}

async function removeOldestPostId(spotifyId) {
  if (!(await checkPost(spotifyId))) {
    return;
  }
  const postIds = await getPost(spotifyId);
  const postIdKeys = Object.keys(postIds);
  if (postIdKeys.length == 0) {
    return;
  }
  await removePost(spotifyId, postIdKeys[0]);
  // let oldestPostIdKey = postIdKeys[0];
  // for (const postIdKey of postIdKeys) {
  //   if (postIds[postIdKey].date.seconds < postIds[oldestPostIdKey].date.seconds) {
  //     oldestPostIdKey = postIdKey;
  //   }
  // }
  // removePost(spotifyId, oldestPostIdKey);
}

export { checkPost, addPost, getPosts, getPost, updatePost, removePost, addPostId, getPostIdCount, removeOldestPostId };
