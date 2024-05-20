"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistManager = void 0;
const Cache_1 = require("../Cache");
/**
 * A manager to perform actions which belongs to the spotify artist web api.
 */
class ArtistManager {
    /**
     * A manager to perform actions which belongs to the spotify artist web api.
     *
     * @param client The spotify api client.
     * @example const artists = new ArtistManager(client);
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Search for spotify artists with query.
     *
     * @param query The query to search.
     * @param options Some search options to make the search more efficient.
     * @example const results = await client.artists.search('some search');
     */
    async search(query, options = {}) {
        const fetchedData = await this.client.fetch('/search', {
            params: {
                q: query,
                type: 'artist',
                market: options.market,
                limit: options.limit,
                offset: options.offset,
                include_external: options.includeExternalAudio ? 'audio' : undefined
            }
        });
        return fetchedData ? (0, Cache_1.createCacheStructArray)('artists', this.client, fetchedData.artists.items) : [];
    }
    /**
     * Get an artist's information.
     *
     * @param id The spotify artist id.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example const artist = await client.artists.get('id');
     */
    async get(id, force = !this.client.cacheSettings.artists) {
        if (!force && Cache_1.Cache.artists.has(id))
            return Cache_1.Cache.artists.get(id);
        const fetchedData = await this.client.fetch(`/artists/${id}`);
        return fetchedData ? (0, Cache_1.createCacheStruct)('artists', this.client, fetchedData) : null;
    }
    /**
     * Get the information of multiple spotify artists in one fetch.
     *
     * @param ids An array of spotify ids.
     * @example const artists = await client.artists.getMultiple(['id1', 'id2']);
     */
    async getMultiple(ids) {
        const fetchedData = await this.client.fetch('/artists', { params: { ids: ids.join(',') } });
        return fetchedData ? (0, Cache_1.createCacheStructArray)('artists', this.client, fetchedData.artists) : [];
    }
    /**
     * Get the information of top tracks from the spotify artist.
     *
     * @param id The spotify artist id.
     * @param market The market query option.
     * @example const topTracks = await client.artists.getTopTracks('id');
     */
    async getTopTracks(id, market = 'US') {
        const fetchedData = await this.client.fetch(`/artists/${id}/top-tracks`, { params: { market } });
        return fetchedData ? (0, Cache_1.createCacheStructArray)('tracks', this.client, fetchedData.tracks) : [];
    }
    /**
     * Get the information of the artists who are related to a paticular artist.
     *
     * @param id The spotify artist id.
     * @example const relatedArtists = await client.artists.getRelatedArtists('id');
     */
    async getRelatedArtists(id) {
        const fetchedData = await this.client.fetch(`/artists/${id}/related-artists`);
        return fetchedData ? (0, Cache_1.createCacheStructArray)('artists', this.client, fetchedData.artists) : [];
    }
    /**
     * Get the informations of albums of the artist.
     *
     * @param id The spotify artist id.
     * @param options The options necessary to get the albums in a sorted way.
     * @example const albums = await client.artists.getAlbums('id');
     */
    async getAlbums(id, options = {}) {
        const fetchedData = await this.client.fetch(`/artists/${id}/albums`, {
            params: {
                include_groups: options.includeGroups,
                market: options.market,
                limit: options.limit,
                offset: options.offset
            }
        });
        return fetchedData ? (0, Cache_1.createCacheStructArray)('albums', this.client, fetchedData.items) : [];
    }
    /**
     * Follow one or many artists.
     * This method requires an user authorized token.
     *
     * @param ids The array of artist ids.
     * @example await client.artists.follow('id1', 'id2');
     */
    follow(...ids) {
        return this.client.fetch(`/me/following`, {
            method: 'PUT',
            params: { type: 'artist', ids: ids.join(',') }
        }).then(x => x != null);
    }
    /**
     * Unfollow one or many artists.
     * This method requires an user authorized token.
     *
     * @param ids The array of artist ids.
     * @example await client.artists.unfollow('id1', 'id2');
     */
    unfollow(...ids) {
        return this.client.fetch(`/me/following`, {
            method: 'DELETE',
            params: { type: 'artist', ids: ids.join(',') }
        }).then(x => x != null);
    }
}
exports.ArtistManager = ArtistManager;
