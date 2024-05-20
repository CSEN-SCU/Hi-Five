"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const axios_1 = __importDefault(require("axios"));
const Error_1 = require("./Error");
const Auth_1 = require("./managers/Auth");
const User_1 = require("./managers/User");
const Artist_1 = require("./managers/Artist");
const Browse_1 = require("./managers/Browse");
const Album_1 = require("./managers/Album");
const Episode_1 = require("./managers/Episode");
const Playlist_1 = require("./managers/Playlist");
const Show_1 = require("./managers/Show");
const Track_1 = require("./managers/Track");
const UserClient_1 = require("./managers/UserClient");
const Cache_1 = require("./Cache");
const NOOP = () => { };
/**
 * The basic client to interact with the Spotify Web API.
 */
class Client {
    /**
     * The basic client to interact with the Spotify Web API.
     *
     * @param options The options necessary for the client.
     * @example const client = new Client({ token: "someToken" });
     */
    constructor(options) {
        var _a;
        /**
         * The version of spotify web api. For future purposes.
         */
        this.version = 'v1';
        /**
         * The refresh event of the client.
         */
        this.onRefresh = NOOP;
        /**
         * Boolean stating should the client retry when the request is rate limited or not by default it is true.
         */
        this.retryOnRateLimit = true;
        /**
         * Cache settings for the client.
         */
        this.cacheSettings = {};
        this.onRefresh = options.onRefresh || NOOP;
        this.retryOnRateLimit = (_a = options.retryOnRateLimit) !== null && _a !== void 0 ? _a : true;
        this.auth = new Auth_1.AuthManager(this.token);
        this.users = new User_1.UserManager(this);
        this.artists = new Artist_1.ArtistManager(this);
        this.browse = new Browse_1.BrowseManager(this);
        this.albums = new Album_1.AlbumManager(this);
        this.episodes = new Episode_1.EpisodeManager(this);
        this.playlists = new Playlist_1.PlaylistManager(this);
        this.shows = new Show_1.ShowManager(this);
        this.tracks = new Track_1.TrackManager(this);
        this._init(options);
        if (typeof options.cacheSettings == "object")
            this.cacheSettings = options.cacheSettings;
        else if (options.cacheSettings == true)
            this.cacheSettings = {
                users: true,
                artists: true,
                tracks: true,
                episodes: true,
                shows: true,
                albums: true,
                playlists: true
            };
    }
    /**
     * Creates a client and returns it as promise when its ready.
     *
     * @param options The same client options provided for the constructor but "onReady" and "onFail" fields should not be provided.
     * @example const client = await Client.create({ token: "token" });
     */
    static create(options) {
        return new Promise((onReady, onFail) => new Client({ ...options, onReady, onFail }));
    }
    /**
     * Search a query in spotify through web api across various types.
     *
     * @param query The query to search.
     * @param options The types, limit, offset, market query paramaters.
     * @example const { tracks, albums } = await client.search('some query', { types: ['track', 'album'] });
     */
    async search(query, options) {
        const response = {};
        const fetchedData = await this.fetch('/search', {
            params: {
                q: query,
                type: options.types.join(','),
                market: options.market,
                limit: options.limit,
                offset: options.offset,
                include_external: options.includeExternalAudio ? 'audio' : undefined
            }
        });
        if (fetchedData.albums)
            response.albums = (0, Cache_1.createCacheStructArray)('albums', this, fetchedData.albums.items);
        if (fetchedData.tracks)
            response.tracks = (0, Cache_1.createCacheStructArray)('tracks', this, fetchedData.tracks.items);
        if (fetchedData.episodes)
            response.episodes = (0, Cache_1.createCacheStructArray)('episodes', this, fetchedData.episodes.items);
        if (fetchedData.shows)
            response.shows = (0, Cache_1.createCacheStructArray)('shows', this, fetchedData.shows.items);
        if (fetchedData.artists)
            response.artists = (0, Cache_1.createCacheStructArray)('artists', this, fetchedData.artists.items);
        return response;
    }
    /**
     * Used to fetch data from spotify rest api.
     *
     * @param url The path from spotify api to fetch!
     * @param options The additional options required to fetch from the api.
     * @example await client.fetch('/users/id');
     */
    fetch(url, options = {}) {
        return (0, axios_1.default)({
            url: `https://api.spotify.com/${this.version}${url}`,
            method: options.method || 'GET',
            params: options.params,
            headers: {
                Authorization: "Bearer " + this.token,
                Accept: 'application/json',
                ...options.headers
            },
            data: options.body
        }).then(response => response.data, async (error) => {
            var _a, _b, _c, _d;
            if (!error.response)
                throw new Error_1.SpotifyAPIError(error);
            else if (error.response.status == 404)
                return null;
            else if (error.response.status == 429 && this.retryOnRateLimit) {
                const retryAfter = error.response.headers['Retry-After'];
                if (typeof retryAfter == "number")
                    await new Promise(r => setTimeout(r, retryAfter * 1000));
            }
            else if (
            // @ts-ignore
            ((_b = (_a = error.response.data) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.message) == "Invalid access token" ||
                // @ts-ignore
                ((_d = (_c = error.response.data) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.message) == "The access token expired" &&
                    this.refreshMeta)
                await this.refreshFromMeta();
            else
                throw new Error_1.SpotifyAPIError(error);
            return this.fetch(url, options);
        });
    }
    /**
     * Refreshes the token from meta.
     */
    async refreshFromMeta() {
        if (!this.refreshMeta)
            return;
        if ('refreshToken' in this.refreshMeta) {
            this.auth.getUserToken(this.refreshMeta)
                .then(context => {
                this.token = context.accessToken;
                if (context.refreshToken)
                    this.refreshMeta.refreshToken = context.refreshToken;
                new UserClient_1.UserClient(this).patchInfo().then(x => {
                    this.user = x;
                    this.onRefresh();
                });
            });
        }
        else {
            this.auth.getApiToken(this.refreshMeta.clientID, this.refreshMeta.clientSecret)
                .then(token => {
                this.token = token;
                this.onRefresh();
            });
        }
        this.auth = new Auth_1.AuthManager(this.token);
    }
    /**
     * A function to initate the client through options and client options.
     */
    async _init(options) {
        var _a;
        if (!options.token)
            throw new Error_1.SpotifyAPIError('No token was provided in [ClientOptions]');
        try {
            if (typeof options.token == "string") {
                if (options.refreshToken)
                    console.trace("[SpotifyClientWarn]: You have provided a token and used `refreshToken` option. Try to provide clientID, clientSecret or user authenication details.");
                this.token = options.token;
                if (options.userAuthorizedToken)
                    this.user = await new UserClient_1.UserClient(this).patchInfo();
            }
            else if ('token' in options.token) {
                this.token = options.token.token;
                this.refreshMeta = options.token;
                if (options.userAuthorizedToken)
                    this.user = await new UserClient_1.UserClient(this).patchInfo();
            }
            else if (('redirectURL' in options.token) || ('refreshToken' in options.token)) {
                const context = await this.auth.getUserToken(options.token);
                this.refreshMeta = options.token;
                if (context.refreshToken)
                    this.refreshMeta.refreshToken = context.refreshToken;
                this.token = context.accessToken;
                this.user = await new UserClient_1.UserClient(this).patchInfo();
            }
            else if ('clientID' in options.token) {
                this.refreshMeta = options.token;
                this.token = await this.auth.getApiToken(options.token.clientID, options.token.clientSecret);
            }
            else
                throw new Error_1.SpotifyAPIError('Improper [ClientOptions] provided!.');
            (_a = options.onReady) === null || _a === void 0 ? void 0 : _a.call(options, this);
        }
        catch (error) {
            // Only possible error here that could be thrown is AxiosError from getApiToken and getUserToken.
            error = new Error_1.SpotifyAPIError(error);
            if (options.onFail)
                options.onFail(error);
            else
                throw error;
        }
    }
}
exports.Client = Client;
