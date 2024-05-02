import { add, get, update } from "./base.js";

// TODO: If needed, also check poster_id values
// TODO: If needed, type check

// General functions:

async function addView(spotifyId, fields) {
  await add("views", spotifyId, fields);
}

async function getView(spotifyId, field) {
  return field
    ? await get("views", spotifyId, field)
    : await get("views", spotifyId);
}

async function updateView(spotifyId, fields) {
  await update("views", spotifyId, fields);
}

// TODO: Specific functions:

export { addView, getView, updateView };
