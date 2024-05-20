"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = exports.createCacheStructArray = exports.createCacheSavedStructArray = exports.createForcedCacheStruct = exports.createCacheStruct = void 0;
const Artist_1 = require("./structures/Artist");
const User_1 = require("./structures/User");
const Track_1 = require("./structures/Track");
const Album_1 = require("./structures/Album");
const Playlist_1 = require("./structures/Playlist");
const Episode_1 = require("./structures/Episode");
const Show_1 = require("./structures/Show");
/**
 * The cache handler for the module.
 */
const Cache = {
    users: new Map(),
    artists: new Map(),
    tracks: new Map(),
    albums: new Map(),
    playlists: new Map(),
    episodes: new Map(),
    shows: new Map()
};
exports.Cache = Cache;
/**
 * Creates a cache structure from key, client and its raw data.
 * @hideconstructor
 */
function createCacheStruct(key, client, data) {
    let structure = new Structures[key](data, client);
    if (client.cacheSettings[key])
        Cache[key].set(data.id, structure);
    return structure;
}
exports.createCacheStruct = createCacheStruct;
/**
 * Creates a structure which will be cached even if the option is set to false from key, client and its raw data.
 * @hideconstructor
 */
function createForcedCacheStruct(key, client, data) {
    let structure = new Structures[key](data, client);
    Cache[key].set(data.id, structure);
    return structure;
}
exports.createForcedCacheStruct = createForcedCacheStruct;
/**
 * Creates an array of cache structure of a saved object from key, client and its raw data.
 * @hideconstructor
 */
function createCacheSavedStructArray(key, client, data, fromCache = false) {
    let normalKey = key.slice(0, -1);
    return data.map(client.cacheSettings[key] && !fromCache ? (x) => {
        let item = new Structures[key](x[normalKey], client);
        Cache[key].set(item.id, item);
        return { addedAt: x.added_at, item };
    } : (x) => ({ addedAt: x.added_at, item: new Structures[key](x[normalKey], client) }));
}
exports.createCacheSavedStructArray = createCacheSavedStructArray;
;
/**
 * Creates an array of cache structure from key, client and its raw data.
 * @hideconstructor
 */
function createCacheStructArray(key, client, data, fromCache = false) {
    return data.map(client.cacheSettings[key] && !fromCache ? x => {
        let structure = new Structures[key](x, client);
        Cache[key].set(x.id, structure);
        return structure;
    } : x => new Structures[key](x, client));
}
exports.createCacheStructArray = createCacheStructArray;
/** The structures map by the keys as name and values as their corresponding structure. */
const Structures = {
    users: User_1.User,
    artists: Artist_1.Artist,
    tracks: Track_1.Track,
    albums: Album_1.Album,
    playlists: Playlist_1.Playlist,
    episodes: Episode_1.Episode,
    shows: Show_1.Show
};
