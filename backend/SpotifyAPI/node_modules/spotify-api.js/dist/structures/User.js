"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Util_1 = require("../Util");
/**
 * Spotify api's user object.
 */
class User {
    /**
     * To create a js object conataing camel case keys of the PublicUser data with additional functions.
     *
     * @param client The spotify client.
     * @example const user = new User(fetchedData);
     */
    constructor(data) {
        /**
         * The Spotify object type which will be 'user'.
         */
        this.type = 'user';
        this.displayName = data.display_name || null;
        this.id = data.id;
        this.uri = data.uri;
        this.images = data.images || [];
        this.externalURL = data.external_urls;
        if (data.followers)
            this.totalFollowers = data.followers.total;
    }
    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${((0, Util_1.hexToRgb)(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
}
exports.User = User;
