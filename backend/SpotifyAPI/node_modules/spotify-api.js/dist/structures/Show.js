"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Show = void 0;
const Cache_1 = require("../Cache");
const Util_1 = require("../Util");
/**
 * Spotify api's show object.
 */
class Show {
    /**
     * To create a js object conataing camel case keys of the SimplifiedShow and Show data with additional functions.
     *
     * @param client The spotify client.
     * @example const show = new Show(fetchedData, client);
     */
    constructor(data, client) {
        this.availableMarkets = data.available_markets;
        this.description = data.description;
        this.copyrights = data.copyrights;
        this.explicit = data.explicit;
        this.externalURL = data.external_urls;
        this.htmlDescription = data.html_description;
        this.id = data.id;
        this.images = data.images;
        this.isExternallyHosted = data.is_externally_hosted;
        this.languages = data.languages;
        this.mediaType = data.media_type;
        this.name = data.name;
        this.publisher = data.publisher;
        this.type = data.type;
        this.uri = data.uri;
        if ('episodes' in data)
            this.episodes = (0, Cache_1.createCacheStructArray)('episodes', client, Array.isArray(data.episodes) ? data.episodes : data.episodes.items);
    }
    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${((0, Util_1.hexToRgb)(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
}
exports.Show = Show;
