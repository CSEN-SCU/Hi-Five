"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Episode = void 0;
const Cache_1 = require("../Cache");
const Util_1 = require("../Util");
/**
 * Spotify api's episode object.
 */
class Episode {
    /**
     * To create a js object conataing camel case keys of the SimplifiedEpisode and Episode data with additional functions.
     *
     * @param client The spotify client.
     * @example const episode = new Episode(fetchedData, client);
     */
    constructor(data, client) {
        this.audioPreviewURL = data.audio_preview_url;
        this.description = data.description;
        this.duration = data.duration_ms;
        this.externalURL = data.external_urls;
        this.explicit = data.explicit;
        this.htmlDescription = data.html_description;
        this.id = data.id;
        this.images = data.images;
        this.isExternallyHosted = data.is_externally_hosted;
        this.isPlayable = data.is_playable;
        this.languages = data.languages;
        this.name = data.name;
        this.releaseDate = data.release_date;
        this.releaseDatePrecision = data.release_date_precision;
        this.restrictions = data.restrictions || [];
        this.type = data.type;
        this.uri = data.uri;
        if (data.resume_point) {
            this.resumePoint = {
                fullyPlayed: data.resume_point.fully_played,
                resumePositionMs: data.resume_point.resume_position_ms
            };
        }
        if ('show' in data)
            this.show = (0, Cache_1.createCacheStruct)('shows', client, data.show);
    }
    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${((0, Util_1.hexToRgb)(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
}
exports.Episode = Episode;
