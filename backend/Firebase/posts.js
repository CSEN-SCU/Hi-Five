import { add, get, update, check, remove } from "./base.js";
import { Timestamp } from "firebase/firestore/lite";
// import { generateRandomString } from "../SpotifyAPI/auth.js";
const generateRandomString = (length) => {
  // console.log("generateRandomString");
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const postsCollection = "posts";

// TODO: If needed, also check post_id values
// TODO: If needed, type check

// General functions:

async function checkPost(userId) {
  return await check(postsCollection, userId);
}

async function addPost(userId, fields) {
  await add(postsCollection, userId, fields);
}

async function getPosts() {
  return await get(postsCollection);
}

async function getPost(userId, field) {
  return await get(postsCollection, userId, field);
}

async function updatePost(userId, fields) {
  await update(postsCollection, userId, fields);
}

async function removePost(userId, field) {
  await remove(postsCollection, userId, field);
}

// TODO: Specialized functions

async function addPostId(userId, trackUri) {
  while ((await getPostIdCount(userId)) >= 14) {
    await removeOldestPostId(userId);
  }
  const postIdKeys = Object.keys(await getPost(userId));
  let newPostId;
  do {
    newPostId = generateRandomString(6);
  } while (postIdKeys.includes(newPostId));
  await updatePost(userId, {
    [newPostId]: { date: Timestamp.now(), track_uri: trackUri },
  });
}

async function getPostIdCount(userId) {
  return Object.keys(await getPost(userId)).length;
}

async function getNewestPostId(userId) {
  const postIds = await getPost(userId);
  const postIdKeys = Object.keys(postIds);
  if (postIdKeys.length == 0) {
    return;
  }
  return await getPost(userId, postIdKeys[postIdKeys.length - 1]);
}

async function removeOldestPostId(userId) {
  if (!(await checkPost(userId))) {
    return;
  }
  const postIds = await getPost(userId);
  const postIdKeys = Object.keys(postIds);
  if (postIdKeys.length == 0) {
    return;
  }
  await removePost(userId, postIdKeys[0]);
  // let oldestPostIdKey = postIdKeys[0];
  // for (const postIdKey of postIdKeys) {
  //   if (postIds[postIdKey].date.seconds < postIds[oldestPostIdKey].date.seconds) {
  //     oldestPostIdKey = postIdKey;
  //   }
  // }
  // removePost(userId, oldestPostIdKey);
}

export {
  checkPost,
  addPost,
  getPosts,
  getPost,
  updatePost,
  removePost,
  addPostId,
  getPostIdCount,
  getNewestPostId,
  removeOldestPostId,
};
