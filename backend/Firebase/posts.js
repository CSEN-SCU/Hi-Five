import { add, get, update, check, remove } from "./base.js";

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

async function getPost(spotifyId, field) {
  return await get(postsCollection, spotifyId, field);
}

async function updatePost(spotifyId, fields) {
  await update(postsCollection, spotifyId, fields);
}

async function removePost(spotifyId) {
  await remove(postsCollection, spotifyId);
}

// TODO: Specific functions:

export { checkPost, addPost, getPost, updatePost, removePost };
