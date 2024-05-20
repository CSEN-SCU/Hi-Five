"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Artist = void 0;
const Util_1 = require("../Util");
/**
 * Spotify api's user object.
 */
class Artist {
    /**
     * To create a js object containing camel case keys of SimplifiedArtist or Artist data with additional functions.
     *
     * @param data The raw data received from the api.
     * @example const artist = new Artist(fetchedData);
     */
    constructor(data) {
        this.externalURL = data.external_urls;
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.uri = data.uri;
        if ('images' in data) {
            this.images = data.images;
            this.popularity = data.popularity;
            this.genres = data.genres;
            this.totalFollowers = data.followers.total;
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
exports.Artist = Artist;
