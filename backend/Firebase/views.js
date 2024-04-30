import { set, get, update } from "./base.js";

// TODO: If needed, also check poster_id values
// TODO: If needed, type check
var valid_fields = new Set(["poster_id"]);

// General functions:

async function setView(spotifyId, fields) {
  const fieldsKeys = Object.keys(fields);
  if (
    fieldsKeys.length !== valid_fields.size ||
    !fieldsKeys.every((key) => valid_fields.has(key))
  ) {
    throw new Error(
      "Fields object must contain exactly and only the valid fields."
    );
  }
  await set("views", spotifyId, fields);
}

async function getView(spotifyId, field) {
  if (field && !valid_fields.has(field)) {
    throw new Error(`Invalid field: ${field}`);
  }
  return (await get("views", spotifyId, field))
    ? field
    : get("views", spotifyId);
}

async function updateView(spotifyId, fields) {
  for (const key of Object.keys(fields)) {
    if (!valid_fields.has(key)) {
      throw new Error(`Invalid field: ${key}`);
    }
  }
  await update("views", spotifyId, fields);
}

// TODO: Specific functions:

export { setView, getView, updateView };
