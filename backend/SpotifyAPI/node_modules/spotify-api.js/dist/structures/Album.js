"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
const Cache_1 = require("../Cache");
const Util_1 = require("../Util");
/**
 * Spotify api's album object.
 */
class Album {
    /**
     * To create a js object conataing camel case keys of the SimplifiedAlbum and Album data with additional functions.
     *
     * @param data The raw data received from the api.
     * @param client The spotify client.
     * @example const album = new Album(fetchedData, client);
     */
    constructor(data, client) {
        this.artists = (0, Cache_1.createCacheStructArray)('artists', client, data.artists);
        this.albumType = data.album_type;
        this.availableMarkets = data.available_markets || [];
        this.externalURL = data.external_urls;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.releaseDate = data.release_date;
        this.releaseDatePrecision = data.release_date_precision;
        this.restrictions = data.restrictions || [];
        this.totalTracks = data.total_tracks;
        this.type = data.type;
        this.uri = data.uri;
        if ('tracks' in data) {
            this.tracks = (0, Cache_1.createCacheStructArray)('tracks', client, Array.isArray(data.tracks) ? data.tracks : data.tracks.items);
            this.externalID = data.external_ids;
            this.copyrights = data.copyrights;
            this.genres = data.genres;
            this.label = data.label;
            this.popularity;
        }
        else
            this.albumGroup = data.album_group;
    }
    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${((0, Util_1.hexToRgb)(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
}
exports.Album = Album;
