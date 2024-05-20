"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowseManager = void 0;
const Cache_1 = require("../Cache");
/**
 * A manager to perform actions which belongs to the spotify browse web api.
 */
class BrowseManager {
    /**
     * A manager to perform actions which belongs to the spotify browse web api.
     *
     * @param client The spotify api client.
     * @example const browse = new BrowseManager(client);
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Get all the new album releases.
     *
     * @param options The country, offset, limit query parameters options.
     * @example const albums = await browse.getNewReleases();
     */
    async getNewReleases(options) {
        const fetchedData = await this.client.fetch('/browse/new-releases', { params: options });
        return fetchedData ? (0, Cache_1.createCacheStructArray)('albums', this.client, fetchedData.albums.items) : [];
    }
    /**
     * Get the featured playlists.
     *
     * @param options The country, locale, timestamp, offset, limit query parameters options.
     * @example const playlists = await browse.getFeaturedPlaylists();
     */
    async getFeaturedPlaylists(options) {
        const fetchedData = await this.client.fetch('/browse/featured-playlists', { params: options });
        return fetchedData ? {
            message: fetchedData.message,
            playlists: (0, Cache_1.createCacheStructArray)('playlists', this.client, fetchedData.playlists.items)
        } : null;
    }
    /**
     * Get an array of all categories.
     *
     * @param options The country, locale, offset, limit query parameters options.
     * @example const categories = await browse.getCategories();
     */
    async getCategories(options) {
        const fetchedData = await this.client.fetch('/browse/categories', { params: options });
        return fetchedData ? fetchedData.categories.items : [];
    }
    /**
     * Get the brief information about a paticular category.
     *
     * @param id The category id.
     * @param options The country, locale query parameters options.
     * @example const category = await browse.getCategory('party');
     */
    getCategory(id, options) {
        return this.client.fetch(`/browse/categories/${id}`, { params: options });
    }
    /**
     * Get the playlists of a paticular category.
     *
     * @param id The spotify category id.
     * @param options The country, offset, limit query parameters options.
     * @example const playlists = await browse.getCategoryPlaylists('party');
     */
    async getCategoryPlaylists(id, options) {
        const fetchedData = await this.client.fetch(`/browse/categories/${id}/playlists`, { params: options });
        return fetchedData ? (0, Cache_1.createCacheStructArray)('playlists', this.client, fetchedData.playlists.items) : [];
    }
    /**
     * Get all the recommendations from the api sorted by the [RecommendationQuery] structure.
     *
     * @param options The [RecommendationQuery] options structure which will be sent as query paramaters.
     * @example
     * const genres = await browse.getRecommendations({
     *     seed_artists: 'artists_id',
     *     seed_genre: 'genre',
     *     seed_tracks: 'tracks
     * });
     */
    async getRecommendations(options) {
        const fetchedData = await this.client.fetch('/recommendations', { params: options });
        return fetchedData ? {
            seeds: fetchedData.seeds,
            tracks: (0, Cache_1.createCacheStructArray)('tracks', this.client, fetchedData.tracks)
        } : null;
    }
    /**
     * Get all the recommendation genres.
     *
     * @example const genres = await browse.getRecommendationGenreSeeds();
     */
    getRecommendationGenreSeeds() {
        return this.client.fetch('/recommendations/available-genre-seeds');
    }
    /**
     * Get all the available markets.
     *
     * @example const { markets } = await client.browse.getMarkets();
     */
    getAvailableMarkets() {
        return this.client.fetch('/markets');
    }
}
exports.BrowseManager = BrowseManager;
