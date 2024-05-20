"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowManager = void 0;
const Cache_1 = require("../Cache");
/**
 * A manager to perform actions which belongs to the spotify show web api.
 */
class ShowManager {
    /**
     * A manager to perform actions which belongs to the spotify show web api.
     *
     * @param client The spotify api client.
     * @example const shows = new ShowManager(client);
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Search for spotify shows with query.
     *
     * @param query The query to search.
     * @param options Some search options to make the search more efficient.
     * @example const results = await client.shows.search('some search');
     */
    async search(query, options = {}) {
        const fetchedData = await this.client.fetch('/search', {
            params: {
                q: query,
                type: 'show',
                market: options.market || 'US',
                limit: options.limit,
                offset: options.offset,
                include_external: options.includeExternalAudio ? 'audio' : undefined
            }
        });
        return fetchedData ? (0, Cache_1.createCacheStructArray)('shows', this.client, fetchedData.shows.items) : [];
    }
    /**
     * Get an show's information.
     *
     * @param id The spotify show id.
     * @param market Only shows that are available in that market will be returned.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example const show = await client.shows.get('id');
     */
    async get(id, market = 'US', force = !this.client.cacheSettings.shows) {
        if (!force && Cache_1.Cache.shows.has(id))
            return Cache_1.Cache.shows.get(id);
        const fetchedData = await this.client.fetch(`/shows/${id}`, { params: { market } });
        return fetchedData ? (0, Cache_1.createCacheStruct)('shows', this.client, fetchedData) : null;
    }
    /**
     * Get the information of multiple spotify shows in one fetch.
     *
     * @param ids An array of spotify ids.
     * @param market Only shows that are available in that market will be returned.
     * @example const shows = await client.shows.getMultiple(['id1', 'id2']);
     */
    async getMultiple(ids, market = 'US') {
        const fetchedData = await this.client.fetch('/shows', {
            params: { ids: ids.join(','), market }
        });
        return fetchedData ? (0, Cache_1.createCacheStructArray)('shows', this.client, fetchedData.shows) : [];
    }
    /**
     * Get the information of the episodes of the show.
     *
     * @param id The spotify show id.
     * @param options The limit, offset, market query paramater options.
     * @example const episodes = await client.shows.getEpisodes('id');
     */
    async getEpisodes(id, options = {}) {
        const fetchedData = await this.client.fetch(`/shows/${id}/episodes`, {
            params: {
                market: 'US',
                ...options
            }
        });
        return fetchedData ? (0, Cache_1.createCacheStructArray)('episodes', this.client, fetchedData.items) : [];
    }
}
exports.ShowManager = ShowManager;
