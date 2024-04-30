import { set, get, update } from "./base.js";

// TODO: If needed, also check post_id values
// TODO: If needed, type check
var valid_fields = new Set(["post_id"]);

// General functions:

async function setPost(spotifyId, fields) {
  const fieldsKeys = Object.keys(fields);
  if (
    fieldsKeys.length !== valid_fields.size ||
    !fieldsKeys.every((key) => valid_fields.has(key))
  ) {
    throw new Error(
      "Fields object must contain exactly and only the valid fields."
    );
  }
  await set("posts", spotifyId, fields);
}

async function getPost(spotifyId, field) {
  if (field && !valid_fields.has(field)) {
    throw new Error(`Invalid field: ${field}`);
  }
  return (await get("posts", spotifyId, field))
    ? field
    : get("posts", spotifyId);
}

async function updatePost(spotifyId, fields) {
  for (const key of Object.keys(fields)) {
    if (!valid_fields.has(key)) {
      throw new Error(`Invalid field: ${key}`);
    }
  }
  await update("posts", spotifyId, fields);
}

// TODO: Specific functions:

export { setPost, getPost, updatePost };
