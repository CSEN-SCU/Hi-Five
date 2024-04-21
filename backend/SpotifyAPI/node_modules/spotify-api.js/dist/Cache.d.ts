import type { Client } from './Client';
import type { Saved } from './Interface';
import { Artist } from './structures/Artist';
import { User } from './structures/User';
import { Track } from './structures/Track';
import { Album } from './structures/Album';
import { Playlist } from './structures/Playlist';
import { Episode } from './structures/Episode';
import { Show } from './structures/Show';
/**
 * The cache handler for the module.
 */
declare const Cache: {
    users: Map<string, User>;
    artists: Map<string, Artist>;
    tracks: Map<string, Track>;
    albums: Map<string, Album>;
    playlists: Map<string, Playlist>;
    episodes: Map<string, Episode>;
    shows: Map<string, Show>;
};
/**
 * Creates a cache structure from key, client and its raw data.
 * @hideconstructor
 */
export declare function createCacheStruct<T>(key: keyof typeof Structures, client: Client, data: any): T;
/**
 * Creates a structure which will be cached even if the option is set to false from key, client and its raw data.
 * @hideconstructor
 */
export declare function createForcedCacheStruct<T>(key: keyof typeof Structures, client: Client, data: any): T;
/**
 * Creates an array of cache structure of a saved object from key, client and its raw data.
 * @hideconstructor
 */
export declare function createCacheSavedStructArray<T>(key: keyof typeof Structures, client: Client, data: [], fromCache?: boolean): Saved<T>[];
/**
 * Creates an array of cache structure from key, client and its raw data.
 * @hideconstructor
 */
export declare function createCacheStructArray<T>(key: keyof typeof Structures, client: Client, data: any[], fromCache?: boolean): T[];
/** The structures map by the keys as name and values as their corresponding structure. */
declare const Structures: {
    users: typeof User;
    artists: typeof Artist;
    tracks: typeof Track;
    albums: typeof Album;
    playlists: typeof Playlist;
    episodes: typeof Episode;
    shows: typeof Show;
};
export { Cache };
