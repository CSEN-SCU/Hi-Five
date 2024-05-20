import { AuthManager } from "./managers/Auth";
import { UserManager } from "./managers/User";
import { ArtistManager } from "./managers/Artist";
import { BrowseManager } from "./managers/Browse";
import { AlbumManager } from "./managers/Album";
import { EpisodeManager } from "./managers/Episode";
import { PlaylistManager } from "./managers/Playlist";
import { ShowManager } from "./managers/Show";
import { TrackManager } from "./managers/Track";
import { UserClient } from "./managers/UserClient";
import type { ClientOptions, FetchOptions, ClientRefreshMeta, CacheSettings, ClientSearchOptions, SearchContent } from "./Interface";
/**
 * The basic client to interact with the Spotify Web API.
 */
export declare class Client {
    /**
     * The token of the spotify web client.
     */
    token: string;
    /**
     * The manager to perform actions regarding the authorization to the web api.
     */
    auth: AuthManager;
    /**
     * A manager to perform actions which belongs to the spotify user web api.
     */
    users: UserManager;
    /**
     * A manager to perform actions which belongs to the spotify artist web api.
     */
    artists: ArtistManager;
    /**
     * A manager to perform actions which belongs to the spotify browse web api.
     */
    browse: BrowseManager;
    /**
     * A manager to perform actions which belongs to the spotify album web api.
     */
    albums: AlbumManager;
    /**
     * A manager to perform actions which belongs to the spotify episode web api.
     */
    episodes: EpisodeManager;
    /**
     * A manager to perform actions which belongs to the spotify playlist web api.
     */
    playlists: PlaylistManager;
    /**
     * A manager to perform actions which belongs to the spotify show web api.
     */
    shows: ShowManager;
    /**
     * A manager to perform actions which belongs to the spotify track web api.
     */
    tracks: TrackManager;
    /**
     * The client which handles all the current user api endpoints and with the details of the current user.
     */
    user: UserClient;
    /**
     * The version of spotify web api. For future purposes.
     */
    version: `v${number}`;
    /**
     * The refresh event of the client.
     */
    onRefresh: () => void;
    /**
     * The metadata for continous refresh of token.
     */
    refreshMeta?: ClientRefreshMeta;
    /**
     * Boolean stating should the client retry when the request is rate limited or not by default it is true.
     */
    retryOnRateLimit?: boolean;
    /**
     * Cache settings for the client.
     */
    cacheSettings: CacheSettings;
    /**
     * The basic client to interact with the Spotify Web API.
     *
     * @param options The options necessary for the client.
     * @example const client = new Client({ token: "someToken" });
     */
    constructor(options: ClientOptions);
    /**
     * Creates a client and returns it as promise when its ready.
     *
     * @param options The same client options provided for the constructor but "onReady" and "onFail" fields should not be provided.
     * @example const client = await Client.create({ token: "token" });
     */
    static create(options: Omit<ClientOptions, 'onReady' | 'onFail'>): Promise<Client>;
    /**
     * Search a query in spotify through web api across various types.
     *
     * @param query The query to search.
     * @param options The types, limit, offset, market query paramaters.
     * @example const { tracks, albums } = await client.search('some query', { types: ['track', 'album'] });
     */
    search(query: string, options: ClientSearchOptions): Promise<SearchContent>;
    /**
     * Used to fetch data from spotify rest api.
     *
     * @param url The path from spotify api to fetch!
     * @param options The additional options required to fetch from the api.
     * @example await client.fetch('/users/id');
     */
    fetch(url: string, options?: FetchOptions): any;
    /**
     * Refreshes the token from meta.
     */
    refreshFromMeta(): Promise<void>;
    /**
     * A function to initate the client through options and client options.
     */
    private _init;
}
