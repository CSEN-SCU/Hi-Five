import { add, get, update, check, remove } from "./base.js";

const viewsCollection = "views";

// TODO: If needed, also check poster_id values
// TODO: If needed, type check

// General functions:

async function checkView(spotifyId) {
  return await check(viewsCollection, spotifyId);
}

async function addView(spotifyId, fields) {
  await add(viewsCollection, spotifyId, fields);
}

async function getView(spotifyId, field) {
  return await get(viewsCollection, spotifyId, field);
}

async function updateView(spotifyId, fields) {
  await update(viewsCollection, spotifyId, fields);
}

async function removeView(spotifyId) {
  await remove(viewsCollection, spotifyId);
}

// TODO: Specific functions:

export { checkView, addView, getView, updateView, removeView };
