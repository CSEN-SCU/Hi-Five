import { add, get, update, check, remove } from "./base.js";

const viewsCollection = "views";

// TODO: If needed, also check poster_id values
// TODO: If needed, type check

// General functions:

async function checkView(userId) {
  return await check(viewsCollection, userId);
}

async function addView(userId, fields) {
  await add(viewsCollection, userId, fields);
}

async function getViews() {
  return await get(viewsCollection);
}

async function getView(userId, field) {
  return await get(viewsCollection, userId, field);
}

async function updateView(userId, fields) {
  await update(viewsCollection, userId, fields);
}

async function removeView(userId, field) {
  await remove(viewsCollection, userId, field);
}

// TODO: Specialized functions

export { checkView, addView, getViews, getView, updateView, removeView };
