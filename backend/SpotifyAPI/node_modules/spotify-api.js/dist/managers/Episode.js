"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpisodeManager = void 0;
const Cache_1 = require("../Cache");
/**
 * A manager to perform actions which belongs to the spotify episode web api.
 */
class EpisodeManager {
    /**
     * A manager to perform actions which belongs to the spotify episode web api.
     *
     * @param client The spotify api client.
     * @example const episodes = new EpisodeManager(client);
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Search for spotify episodes with query.
     *
     * @param query The query to search.
     * @param options Some search options to make the search more efficient.
     * @example const results = await client.episodes.search('some search');
     */
    async search(query, options = {}) {
        const fetchedData = await this.client.fetch('/search', {
            params: {
                q: query,
                type: 'episode',
                market: options.market || 'US',
                limit: options.limit,
                offset: options.offset,
                include_external: options.includeExternalAudio ? 'audio' : undefined
            }
        });
        return fetchedData ? (0, Cache_1.createCacheStructArray)('episodes', this.client, fetchedData.episodes.items) : [];
    }
    /**
     * Get an episode's information.
     *
     * @param id The spotify episode id.
     * @param market Only episodes that are available in that market will be returned.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example const episode = await client.episodes.get('id');
     */
    async get(id, market = 'US', force = !this.client.cacheSettings.episodes) {
        if (!force && Cache_1.Cache.episodes.has(id))
            return Cache_1.Cache.episodes.get(id);
        const fetchedData = await this.client.fetch(`/episodes/${id}`, { params: { market } });
        return fetchedData ? (0, Cache_1.createCacheStruct)('episodes', this.client, fetchedData) : null;
    }
    /**
     * Get the information of multiple spotify episodes in one fetch.
     *
     * @param ids An array of spotify ids.
     * @param market Only episodes that are available in that market will be returned.
     * @example const episodes = await client.episodes.getMultiple(['id1', 'id2']);
     */
    async getMultiple(ids, market = 'US') {
        const fetchedData = await this.client.fetch('/episodes', {
            params: { ids: ids.join(','), market }
        });
        return fetchedData ? (0, Cache_1.createCacheStructArray)('episodes', this.client, fetchedData.episodes) : [];
    }
}
exports.EpisodeManager = EpisodeManager;
