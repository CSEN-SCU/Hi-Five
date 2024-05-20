"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Track = void 0;
const Cache_1 = require("../Cache");
const Util_1 = require("../Util");
/**
 * Spotify api's track object.
 */
class Track {
    /**
     * To create a js object conataing camel case keys of the SimplifiedTrack and Track data with additional functions.
     *
     * @param data The raw data received from the api.
     * @param client The spotify client.
     * @example const track = new Track(fetchedData, client);
     */
    constructor(data, client) {
        this.artists = (0, Cache_1.createCacheStructArray)('artists', client, data.artists);
        this.availableMarkets = data.available_markets || [];
        this.discNumber = data.disc_number;
        this.duration = data.duration_ms;
        this.explicit = data.explicit;
        this.externalURL = data.external_urls;
        this.id = data.id;
        this.isLocal = data.is_local;
        this.name = data.name;
        this.previewURL = data.preview_url;
        this.restrictions = data.restrictions || [];
        this.trackNumber = data.track_number;
        this.type = data.type;
        this.uri = data.uri;
        if (data.linked_from) {
            this.isPlayable = data.is_playable;
            this.linkedFrom = {
                externalURL: data.linked_from.external_urls,
                id: data.linked_from.id,
                type: data.linked_from.type,
                uri: data.linked_from.uri
            };
        }
        if ('album' in data) {
            this.album = (0, Cache_1.createCacheStruct)('albums', client, data.album);
            this.externalID = data.external_ids;
            this.popularity = data.popularity;
        }
    }
    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${((0, Util_1.hexToRgb)(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
}
exports.Track = Track;
