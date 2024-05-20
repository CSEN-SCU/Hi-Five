"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackManager = void 0;
const Cache_1 = require("../Cache");
/**
 * A manager to perform actions which belongs to the spotify track web api.
 */
class TrackManager {
    /**
     * A manager to perform actions which belongs to the spotify track web api.
     *
     * @param client The spotify api client.
     * @example const tracks = new TrackManager(client);
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Search for spotify tracks with query.
     *
     * @param query The query to search.
     * @param options Some search options to make the search more efficient.
     * @example const results = await client.tracks.search('some search');
     */
    async search(query, options = {}) {
        const fetchedData = await this.client.fetch('/search', {
            params: {
                q: query,
                type: 'track',
                market: options.market || 'US',
                limit: options.limit,
                offset: options.offset,
                include_external: options.includeExternalAudio ? 'audio' : undefined
            }
        });
        return fetchedData ? (0, Cache_1.createCacheStructArray)('tracks', this.client, fetchedData.tracks.items) : [];
    }
    /**
     * Get an track's information.
     *
     * @param id The spotify track id.
     * @param market Only tracks that are available in that market will be returned.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example const track = await client.tracks.get('id');
     */
    async get(id, market = 'US', force = !this.client.cacheSettings.tracks) {
        if (!force && Cache_1.Cache.tracks.has(id))
            return Cache_1.Cache.tracks.get(id);
        const fetchedData = await this.client.fetch(`/tracks/${id}`, { params: { market } });
        return fetchedData ? (0, Cache_1.createCacheStruct)('tracks', this.client, fetchedData) : null;
    }
    /**
     * Get the information of multiple spotify tracks in one fetch.
     *
     * @param ids An array of spotify ids.
     * @param market Only tracks that are available in that market will be returned.
     * @example const tracks = await client.tracks.getMultiple(['id1', 'id2']);
     */
    async getMultiple(ids, market = 'US') {
        const fetchedData = await this.client.fetch('/tracks', { params: { ids: ids.join(','), market } });
        return fetchedData ? (0, Cache_1.createCacheStructArray)('tracks', this.client, fetchedData.tracks) : [];
    }
    /**
     * Get the audio features of the track.
     * Returned type [AudioFeatures] is not a camelcased object.
     *
     * @param id The spotify track id.
     * @example const audioFeatures = await client.tracks.getAudioFeatures('id');
     */
    getAudioFeatures(id) {
        return this.client.fetch(`/audio-features/${id}`);
    }
    /**
     * Get audio features of multiple tracks.
     * Returned type [AudioFeatures[]] is not a camelcased object.
     *
     * @param ids The array of spotify ids.
     * @example const audioFeatures = await client.tracks.getMultipleAudioFeatures('id1', 'is2');
     */
    getMultipleAudioFeatures(...ids) {
        return this.client.fetch(`/audio-features`, {
            params: { ids: ids.join(',') }
        }).then(x => x || []);
    }
    /**
     * Get the audio analysis of the track.
     * Returned type [AudioAnalysis] is not a camelcase object and not documented.
     *
     * @param id The spotify playlist id.
     * @example const audioAnalysis = await client.tracks.getAudioAnalysis('id');
     */
    getAudioAnalysis(id) {
        return this.client.fetch(`/audio-analysis/${id}`);
    }
}
exports.TrackManager = TrackManager;
