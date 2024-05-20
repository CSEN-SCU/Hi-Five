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

async function getViews() {
  return await get(viewsCollection);
}

async function getView(spotifyId, field) {
  return await get(viewsCollection, spotifyId, field);
}

async function updateView(spotifyId, fields) {
  await update(viewsCollection, spotifyId, fields);
}

async function removeView(spotifyId, field) {
  await remove(viewsCollection, spotifyId, field);
}

// TODO: Specialized functions

export { checkView, addView, getViews, getView, updateView, removeView };
