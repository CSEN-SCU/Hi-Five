"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const Cache_1 = require("../Cache");
/**
 * A manager to perform actions which belongs to the spotify user web api.
 */
class UserManager {
    /**
     * A manager to perform actions which belongs to the spotify user web api.
     *
     * @param client The spotify api client.
     * @example const users = new UserManager(client);
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Get an user's information.
     *
     * @param id The spotify user id.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example const user = await client.users.get('id');
     */
    async get(id, force = !this.client.cacheSettings.users) {
        if (!force && Cache_1.Cache.users.has(id))
            return Cache_1.Cache.users.get(id);
        const fetchedData = await this.client.fetch(`/users/${id}`);
        return fetchedData ? (0, Cache_1.createCacheStruct)('users', this.client, fetchedData) : null;
    }
    /**
     * Get the list of playlists of a user by the user's spotify id.
     *
     * @param id The spotify user id.
     * @param options The limit, offset query parameter options.
     * @example const playlists = await client.users.getPlaylists('id');
     */
    async getPlaylists(id, options = {}) {
        const fetchedData = await this.client.fetch(`/users/${id}/playlists`, { params: options });
        return fetchedData ? (0, Cache_1.createCacheStructArray)('playlists', this.client, fetchedData.items) : [];
    }
    /**
     * Verify a list of users follows a paticular playlist.
     *
     * @param playlistID The id of the spotify playlist.
     * @param ids The array of spotify user ids.
     * @example const [userFollows] = await client.users.followsPlaylist('id');
     */
    followsPlaylist(playlistID, ...ids) {
        return this.client.fetch(`/playlists/${playlistID}/followers/contains`, {
            params: { ids: ids.join(',') }
        }).then(x => x || []);
    }
    /**
     * Follow one or many users.
     * This method requires an user authorized token.
     *
     * @param ids The array of user ids.
     * @example await client.users.follow('id1', 'id2');
     */
    follow(...ids) {
        return this.client.fetch(`/me/following`, {
            method: 'PUT',
            params: { type: 'user', ids: ids.join(',') }
        }).then(x => x != null);
    }
    /**
     * Unfollow one or many users.
     * This method requires an user authorized token.
     *
     * @param ids The array of user ids.
     * @example await client.users.unfollow('id1', 'id2');
     */
    unfollow(...ids) {
        return this.client.fetch(`/me/following`, {
            method: 'DELETE',
            params: { type: 'user', ids: ids.join(',') }
        }).then(x => x != null);
    }
}
exports.UserManager = UserManager;
