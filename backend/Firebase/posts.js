import { add, get, update } from "./base.js";

// TODO: If needed, also check post_id values
// TODO: If needed, type check

// General functions:

async function addPost(spotifyId, fields) {
  await add("posts", spotifyId, fields);
}

async function getPost(spotifyId, field) {
  return field
    ? await get("posts", spotifyId, field)
    : await get("posts", spotifyId);
}

async function updatePost(spotifyId, fields) {
  await update("posts", spotifyId, fields);
}

// TODO: Specific functions:

export { addPost, getPost, updatePost };
