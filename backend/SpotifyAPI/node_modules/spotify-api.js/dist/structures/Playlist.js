"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlaylistTracks = exports.Playlist = void 0;
const Track_1 = require("./Track");
const Episode_1 = require("./Episode");
const Cache_1 = require("../Cache");
const Util_1 = require("../Util");
/**
 * Spotify api's playlist object.
 */
class Playlist {
    /**
     * To create a js object conataing camel case keys of the SimplifiedPlaylist and Playlist data with additional functions.
     *
     * @param data The raw data received from the api.
     * @param client The spotify client.
     * @example const playlist = new Playlist(fetchedData, client);
     */
    constructor(data, client) {
        this.collaborative = data.collaborative;
        this.description = data.description;
        this.externalURL = data.external_urls;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.owner = (0, Cache_1.createCacheStruct)('users', client, data.owner);
        this.snapshotID = data.snapshot_id;
        this.uri = data.uri;
        this.type = data.type;
        if (Array.isArray(data.tracks)) {
            this.totalTracks = data.tracks.length;
            this.public = data.public;
            this.totalFollowers = data.followers.total;
            this.tracks = createPlaylistTracks(client, data.tracks);
        }
        else
            this.totalTracks = data.tracks.total;
    }
    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${((0, Util_1.hexToRgb)(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
}
exports.Playlist = Playlist;
/**
 * Create playlist tracks structure.
 *
 * @param client The spotify client.
 * @param rawPlaylistTracks The raw data received from the api.
 * @example const playlistTracks = createPlaylistTracks(client, data);
 */
function createPlaylistTracks(client, rawPlaylistTracks) {
    const createTrack = client.cacheSettings.tracks && client.cacheSettings.episodes
        ? (track) => (0, Cache_1.createForcedCacheStruct)(`${track.type}s`, client, track)
        : (track) => track.type == "track"
            ? new Track_1.Track(track, client)
            : new Episode_1.Episode(track, client);
    return rawPlaylistTracks.map(x => ({
        addedAt: x.added_at,
        addedBy: (0, Cache_1.createCacheStruct)('users', client, x.added_by),
        isLocal: x.is_local,
        track: x.track ? createTrack(x.track) : null
    }));
}
exports.createPlaylistTracks = createPlaylistTracks;
