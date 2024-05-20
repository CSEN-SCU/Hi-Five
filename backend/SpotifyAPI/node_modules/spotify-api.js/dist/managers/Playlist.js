"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistManager = void 0;
const Playlist_1 = require("../structures/Playlist");
const Cache_1 = require("../Cache");
/**
 * A manager to perform actions which belongs to the spotify playlist web api.
 */
class PlaylistManager {
    /**
     * A manager to perform actions which belongs to the spotify playlist web api.
     *
     * @param client The spotify api client.
     * @example const playlists = new PlaylistManager(client);
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Get a playlist's information.
     *
     * @param id The spotify playlist id.
     * @param market Only playlists that are available in that market will be returned.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example const playlist = await client.playlists.get('id');
     */
    async get(id, market = 'US', force = !this.client.cacheSettings.playlists) {
        if (!force && Cache_1.Cache.playlists.has(id))
            return Cache_1.Cache.playlists.get(id);
        const fetchedData = await this.client.fetch(`/playlists/${id}`, { params: { market } });
        return fetchedData ? (0, Cache_1.createCacheStruct)('playlists', this.client, fetchedData) : null;
    }
    /**
     * Get the information of the tracks in the playlist.
     *
     * @param id The spotify playlist id.
     * @param options The market, limit, offset query paramaters.
     * @example const tracks = await client.playlists.getTracks('id');
     */
    async getTracks(id, options = {}) {
        const fetchedData = await this.client.fetch(`/playlists/${id}/tracks`, { params: options });
        return fetchedData ? (0, Playlist_1.createPlaylistTracks)(this.client, fetchedData.items) : [];
    }
    /**
     * Get the information of the images of the playlist.
     *
     * @param id The spotify playlist id.
     * @example const images = await client.playlists.getImages('id');
     */
    async getImages(id) {
        return await this.client.fetch(`/playlists/${id}/images`) || [];
    }
    /**
     * Create a playlist for a paticular user.
     * This method requires an user authorized token.
     *
     * @param userID The spotify user id.
     * @param playlist The playlist details.
     * @example const playlist = await client.playlists.create('id', { name: 'My Playlist' });
     */
    async create(userID, playlist) {
        const fetchedData = await this.client.fetch(`/users/${userID}/playlists`, {
            method: 'POST',
            body: playlist
        });
        return fetchedData ? (0, Cache_1.createCacheStruct)('playlists', this.client, fetchedData) : null;
    }
    /**
     * Edit a playlist.
     * This method requires an user authorized token.
     *
     * @param id The playlist id.
     * @param playlist The details of the playlist to edit.
     * @example const playlist = await client.playlists.edit('id', { name: 'Edited playlist' });
     */
    edit(id, playlist) {
        return this.client.fetch(`/playlists/${id}`, {
            method: 'PUT',
            body: playlist
        }).then(x => x != null);
    }
    /**
     * Add items to the playlist.
     * This method requires an user authorized token.
     *
     * @param id The spotify playlist id.
     * @param uris The array of track or episodes uris to add.
     * @param position The index position to add those items else will append it at the end of the playlist.
     * @example
     * const snapshotID = await client.playlists.addItems('playlist id', [myTrack.uri, myAnotherTrack.uri, 'spotify:track:id']);
     */
    async addItems(id, uris, position) {
        const fetchedData = await this.client.fetch(`/playlists/${id}/tracks`, {
            method: 'POST',
            body: {
                uris,
                ...(position !== undefined && { position })
            }
        });
        return fetchedData ? fetchedData.snapshot_id : '';
    }
    /**
     * Reorder items in the playlist.
     * This method requires an user authorized token.
     *
     * @param id The spotify playlist id.
     * @param options The options required to reorder items in the playlist.
     * @example
     * const snapshotID = await client.playlists.reorderItems('playlist id', {
     *     uris: ['spotify:uri:id'],
     *     insertBefore: 2
     * });
     */
    async reorderItems(id, options) {
        const fetchedData = await this.client.fetch(`/playlists/${id}/tracks`, {
            method: 'PUT',
            body: {
                ...(options.uris !== undefined && { uris: options.uris }),
                ...(options.rangeStart !== undefined && { range_start: options.rangeStart }),
                ...(options.rangeLength !== undefined && { range_length: options.rangeLength }),
                ...(options.insertBefore !== undefined && { insert_before: options.insertBefore }),
                ...(options.snapshotID !== undefined && { snapshot_id: options.snapshotID }),
            }
        });
        return fetchedData ? fetchedData.snapshot_id : '';
    }
    /**
     * Remove items from the playlist.
     * This method requires an user authorized token.
     *
     * @param id The spotify playlist id.
     * @param uris The array of spotify uris of either track or episodes to remove
     * @param snapshotID The playlist’s snapshot ID against which you want to make the changes.
     * @example const snapshotID = await client.playlists.removeItems('playlist id', { uris: ['spotify:uri:id']  });
     */
    async removeItems(id, uris, snapshotID) {
        const body = {};
        if (snapshotID)
            body.snapshot_id = snapshotID;
        if (uris)
            body.uris = uris.map(uri => ({ uri }));
        const fetchedData = await this.client.fetch(`/playlists/${id}/tracks`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body
        });
        return fetchedData ? fetchedData.snapshot_id : '';
    }
    /**
     * Upload custom images to the playlist.
     * This method requires an user authorized token.
     *
     * @param id The spotify playlist id.
     * @param imageData The imageData should contain a Base64 encoded JPEG image data, maximum payload size is 256 KB.
     * @example await client.playlists.uploadImage('id', 'data:image/jpeg;....');
     */
    uploadImage(id, imageData) {
        return this.client.fetch(`/playlists/${id}/images`, {
            method: 'PUT',
            headers: { "Content-Type": "image/jpeg" },
            body: imageData
        }).then(x => x != null);
    }
    /**
     * Follow the playlist.
     * This method requires an user authorized token.
     *
     * @param id The spotify playlist id.
     * @param publicly If true, the playlist will be in your list publicly.
     * @example await client.playlists.follow('id');
     */
    follow(id, publicly = true) {
        return this.client.fetch(`/playlists/${id}/followers`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: { public: publicly }
        }).then(x => x != null);
    }
    /**
     * Unfollow the playlist.
     * This method requires an user authorized token.
     *
     * @param id The spotify playlist id.
     * @example await client.playlists.unfollow('id');
     */
    unfollow(id) {
        return this.client.fetch(`/playlists/${id}/followers`, { method: 'DELETE' }).then(x => x != null);
    }
}
exports.PlaylistManager = PlaylistManager;
