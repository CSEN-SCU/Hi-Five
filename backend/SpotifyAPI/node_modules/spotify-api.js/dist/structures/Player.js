"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecentlyPlayed = exports.createCurrentlyPlaying = exports.createCurrentPlayback = exports.createDevice = void 0;
const Cache_1 = require("../Cache");
/**
 * Creates a device structure.
 *
 * @param data The raw device.
 * @example const devices = createDevice(device);
 */
function createDevice(data) {
    return {
        id: data.id,
        isActive: data.is_active,
        isPrivateSession: data.is_private_session,
        isRestricted: data.is_restricted,
        name: data.name,
        type: data.type
    };
}
exports.createDevice = createDevice;
/**
 * Create the current playback structure.
 *
 * @param client The spotify client.
 * @param data The data from the spotify api.
 * @example const currentPlayback = createCurrentPlayback(client, fetchedData);
 */
function createCurrentPlayback(client, data) {
    return {
        shuffleState: data.shuffle_state,
        repeatState: data.repeat_state,
        device: createDevice(data.device),
        ...createCurrentlyPlaying(client, data)
    };
}
exports.createCurrentPlayback = createCurrentPlayback;
/**
 * Create the object structure containing the currently playing details.
 *
 * @param client The spotify client.
 * @param data The data from the spotify api.
 * @example const currentlyPlaying = createCurrentlyPlaying(client, fetchedData);
 */
function createCurrentlyPlaying(client, data) {
    return {
        timestamp: data.timestamp,
        progress: data.progress_ms,
        isPlaying: data.is_playing,
        currentPlayingType: data.currently_playing_type,
        item: data.item ? (0, Cache_1.createCacheStruct)(`${data.item.type}s`, client, data.item) : null,
        context: (data === null || data === void 0 ? void 0 : data.context) ? {
            externalURL: data.context.external_urls,
            href: data.context.href,
            type: data.context.type,
            uri: data.context.uri
        } : null
    };
}
exports.createCurrentlyPlaying = createCurrentlyPlaying;
/**
 * Creates a recently played structure containg the playhistory details.
 *
 * @param client The spotify api client.
 * @param data The raw data fetched from the spotify api.
 * @example const recentlyPlayed = createRecentlyPlayed(client, data);
 */
function createRecentlyPlayed(client, data) {
    return {
        items: data.items.map(x => ({ track: (0, Cache_1.createCacheStruct)('tracks', client, x.track), playedAt: x.played_at })),
        cursors: data.cursors
    };
}
exports.createRecentlyPlayed = createRecentlyPlayed;
