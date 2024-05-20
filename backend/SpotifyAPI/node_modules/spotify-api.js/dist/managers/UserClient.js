"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserClient = void 0;
const Player_1 = require("./Player");
const Error_1 = require("../Error");
const Cache_1 = require("../Cache");
/**
 * The client which handles all the current user api endpoints and with the details of the current user.
 */
class UserClient {
    /**
     * The client which handles all the current user api endpoints with the details of the current user.
     * All the methods in this class requires the user authorized token.
     *
     * @param client The spotify api client.
     * @example const user = new UserClient(client);
     */
    constructor(client) {
        /**
         * The Spotify object type which will be 'user'.
         */
        this.type = 'user';
        this.player = new Player_1.Player(client);
        Object.defineProperty(this, 'client', { value: client });
    }
    /**
     * Patches the current user details info to this manager.
     */
    async patchInfo() {
        const data = await this.client.fetch('/me');
        if (!data)
            throw new Error_1.SpotifyAPIError("Could not load private user data from the user authorized token.");
        this.displayName = data.display_name;
        this.id = data.id;
        this.uri = data.uri;
        this.images = data.images;
        this.totalFollowers = data.followers.total;
        this.externalURL = data.external_urls;
        this.email = data.email;
        this.product = data.product;
        this.country = data.country;
        if (data.explicit_content)
            this.explicitContent = {
                filterEnabled: data.explicit_content.filter_enabled,
                filterLocked: data.explicit_content.filter_locked
            };
        return this;
    }
    /**
     * Get the list of playlists of the current user.
     *
     * @param options The limit, offset query parameter options.
     * @param fetchAll Retrieve all playlist at once if more than 50.
     * @example const playlists = await client.user.getPlaylists();
     */
    async getPlaylists(options = {}, fetchAll = false) {
        const fetchedData = await this.client.fetch(`/me/playlists`, { params: options });
        let playlists = fetchedData.items, length = playlists.length;
        if (fetchAll && fetchedData.total > length) {
            for (let offset = length; offset < fetchedData.total; offset += length) {
                let playlistBatch = await this.client.fetch(`/me/playlists`, { params: { limit: length, offset } });
                playlists.push(...playlistBatch.items);
            }
        }
        return fetchedData ? (0, Cache_1.createCacheStructArray)('playlists', this.client, playlists) : [];
    }
    /**
     * Create a playlist.
     *
     * @param playlist The playlist details to set.
     * @example const playlist = await client.user.createPlaylist({ name: 'My playlist' });
     */
    createPlaylist(playlist) {
        return this.client.playlists.create(this.id, playlist);
    }
    /**
     * Verify if the current user follows a paticular playlist.
     *
     * @param playlistID The id of the spotify playlist.
     * @example const currentUserFollows = await client.user.followsPlaylist('id');
     */
    followsPlaylist(playlistID) {
        return this.client.users.followsPlaylist(playlistID, this.id).then(x => x[0] || false);
    }
    /**
     * Verify if the current user follows one or more artists.
     *
     * @param ids The array of spotify artist ids.
     * @example const [followsArtist] = await client.user.followsArtists('id1');
     */
    followsArtists(...ids) {
        return this.client.fetch(`/me/following/contains`, {
            params: {
                type: 'artist',
                ids: ids.join(',')
            }
        }).then(x => x || ids.map(() => false));
    }
    /**
     * Verify if the current user follows one or more users.
     *
     * @param ids The array of spotify user ids.
     * @example const [followsUser] = await client.user.followsUsers('id1');
     */
    followsUsers(...ids) {
        return this.client.fetch(`/me/following/contains`, {
            params: {
                type: 'user',
                ids: ids.join(',')
            }
        }).then(x => x || ids.map(() => false));
    }
    /**
     * Get an array of artists who are been followed by the current usser.
     *
     * @param options The limit, after query parameters. The after option is the last artist ID retrieved from the previous request.
     * @example const artists = await client.user.getFollowingArtists();
     */
    async getFollowingArtists(options = {}) {
        const fetchedData = await this.client.fetch(`/me/following`, { params: { type: 'artist', ...options } });
        return fetchedData ? (0, Cache_1.createCacheStructArray)('artists', this.client, fetchedData.artists.items) : [];
    }
    /**
     * Get the top tracks of the user based on the current user's affinity.
     *
     * @param options The timeRange, limit, offset query paramaters.
     * @example const topTracks = await client.user.getTopTracks();
     */
    async getTopTracks(options = {}) {
        const fetchedData = await this.client.fetch(`/me/top/tracks`, {
            params: {
                time_range: options.timeRange,
                limit: options.limit,
                offset: options.offset
            }
        });
        return fetchedData ? (0, Cache_1.createCacheStructArray)('tracks', this.client, fetchedData.items) : [];
    }
    /**
     * Get the top artists of the user based on the current user's affinity.
     *
     * @param options The timeRange, limit, offset query paramaters.
     * @example const topArtists = await client.user.getTopArtists();
     */
    async getTopArtists(options = {}) {
        const fetchedData = await this.client.fetch(`/me/top/artists`, {
            params: {
                time_range: options.timeRange,
                limit: options.limit,
                offset: options.offset
            }
        });
        return fetchedData ? (0, Cache_1.createCacheStructArray)('artists', this.client, fetchedData.items) : [];
    }
    /**
     * Get all the saved albums of the current user.
     *
     * @param options The limit, offset, market query paramaters.
     * @example const savedAlbums = await client.user.getSavedAlbums();
     */
    async getSavedAlbums(options) {
        const fetchedData = await this.client.fetch(`/me/albums`, { params: options });
        return fetchedData ? (0, Cache_1.createCacheSavedStructArray)('albums', this.client, fetchedData.items) : [];
    }
    /**
     * Save albums to the current user library.
     *
     * @param ids The array of spotify user ids.
     * @example await client.user.saveAlbums('id1', 'id2');
     */
    saveAlbums(...ids) {
        return this.client.fetch(`/me/albums`, {
            method: 'PUT',
            params: { ids: ids.join(',') }
        }).then(x => x != null);
    }
    /**
     * Remove albums from the current user library.
     *
     * @param ids The array of spotify user ids.
     * @example await client.user.removeAlbums('id1', 'id2');
     */
    removeAlbums(...ids) {
        return this.client.fetch(`/me/albums`, {
            method: 'DELETE',
            params: { ids: ids.join(',') }
        }).then(x => x != null);
    }
    /**
     * Verify if the current user has a paticular one or more albums.
     *
     * @param ids The array of spotify album ids.
     * @example const [hasFirstAlbum, hasSecondAlbum] = await client.user.hasAlbums('id1', 'id2');
     */
    hasAlbums(...ids) {
        return this.client.fetch(`/me/albums/contains`, { params: { ids: ids.join(',') } })
            .then(x => x || ids.map(() => false));
    }
    /**
     * Get all the saved tracks of the current user.
     *
     * @param options The limit, offset, market query paramaters.
     * @example const savedTracks = await client.user.getSavedTracks();
     */
    async getSavedTracks(options) {
        const fetchedData = await this.client.fetch(`/me/tracks`, { params: options });
        return fetchedData ? (0, Cache_1.createCacheSavedStructArray)('tracks', this.client, fetchedData.items) : [];
    }
    /**
     * Save tracks to the current user library.
     *
     * @param ids The array of spotify user ids.
     * @example await client.user.saveTracks('id1', 'id2');
     */
    saveTracks(...ids) {
        return this.client.fetch(`/me/tracks`, {
            method: 'PUT',
            params: { ids: ids.join(',') }
        }).then(x => x != null);
    }
    /**
     * Remove tracks from the current user library.
     *
     * @param ids The array of spotify user ids.
     * @example await client.user.removeTracks('id1', 'id2');
     */
    removeTracks(...ids) {
        return this.client.fetch(`/me/tracks`, {
            method: 'DELETE',
            params: { ids: ids.join(',') }
        }).then(x => x != null);
    }
    /**
     * Verify if the current user has a paticular one or more tracks.
     *
     * @param ids The array of spotify track ids.
     * @example const [hasFirstTrack, hasSecondTrack] = await client.user.hasTracks('id1', 'id2');
     */
    hasTracks(...ids) {
        return this.client.fetch(`/me/tracks/contains`, { params: { ids: ids.join(',') } })
            .then(x => x || ids.map(() => false));
    }
    /**
     * Get all the saved episodes of the current user.
     *
     * @param options The limit, offset, market query paramaters.
     * @example const savedEpisodes = await client.user.getSavedEpisodes();
     */
    async getSavedEpisodes(options) {
        const fetchedData = await this.client.fetch(`/me/episodes`, { params: options });
        return fetchedData ? (0, Cache_1.createCacheSavedStructArray)('episodes', this.client, fetchedData.items) : [];
    }
    /**
     * Save episodes to the current user library.
     *
     * @param ids The array of spotify user ids.
     * @example await client.user.saveEpisodes('id1', 'id2');
     */
    saveEpisodes(...ids) {
        return this.client.fetch(`/me/episodes`, {
            method: 'PUT',
            params: { ids: ids.join(',') }
        }).then(x => x != null);
    }
    /**
     * Remove episodes from the current user library.
     *
     * @param ids The array of spotify user ids.
     * @example await client.user.removeEpisodes('id1', 'id2');
     */
    removeEpisodes(...ids) {
        return this.client.fetch(`/me/episodes`, {
            method: 'DELETE',
            params: { ids: ids.join(',') }
        }).then(x => x != null);
    }
    /**
     * Verify if the current user has a paticular one or more episodes.
     *
     * @param ids The array of spotify episode ids.
     * @example const [hasFirstEpisode, hasSecondEpisode] = await client.user.hasEpisodes('id1', 'id2');
     */
    hasEpisodes(...ids) {
        return this.client.fetch(`/me/episodes/contains`, { params: { ids: ids.join(',') } })
            .then(x => x || ids.map(() => false));
    }
    /**
     * Get all the saved shows of the current user.
     *
     * @param options The limit, offset, market query paramaters.
     * @example const savedShows = await client.user.getSavedShows();
     */
    async getSavedShows(options) {
        const fetchedData = await this.client.fetch(`/me/shows`, { params: options });
        return fetchedData ? (0, Cache_1.createCacheSavedStructArray)('shows', this.client, fetchedData.items) : [];
    }
    /**
     * Save shows to the current user library.
     *
     * @param ids The array of spotify user ids.
     * @example await client.user.saveShows('id1', 'id2');
     */
    saveShows(...ids) {
        return this.client.fetch(`/me/shows`, {
            method: 'PUT',
            params: { ids: ids.join(',') }
        }).then(x => x != null);
    }
    /**
     * Remove shows from the current user library.
     *
     * @param ids The array of spotify user ids.
     * @example await client.user.removeShows('id1', 'id2');
     */
    removeShows(...ids) {
        return this.client.fetch(`/me/shows`, {
            method: 'DELETE',
            params: { ids: ids.join(',') }
        }).then(x => x != null);
    }
    /**
     * Verify if the current user has a paticular one or more shows.
     *
     * @param ids The array of spotify show ids.
     * @example const [hasFirstShow, hasSecondShow] = await client.user.hasShows('id1', 'id2');
     */
    hasShows(...ids) {
        return this.client.fetch(`/me/shows/contains`, { params: { ids: ids.join(',') } })
            .then(x => x || ids.map(() => false));
    }
}
exports.UserClient = UserClient;
