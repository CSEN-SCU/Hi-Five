import type { Client } from "../Client";
import type { SearchOptions } from "../Interface";
import type { Album } from "../structures/Album";
import type { Track } from "../structures/Track";
/**
 * A manager to perform actions which belongs to the spotify album web api.
 */
export declare class AlbumManager {
    client: Client;
    /**
     * A manager to perform actions which belongs to the spotify album web api.
     *
     * @param client The spotify api client.
     * @example const albums = new AlbumManager(client);
     */
    constructor(client: Client);
    /**
     * Search for spotify albums with query.
     *
     * @param query The query to search.
     * @param options Some search options to make the search more efficient.
     * @example const results = await client.albums.search('some search');
     */
    search(query: string, options?: SearchOptions): Promise<Album[]>;
    /**
     * Get an album's information.
     *
     * @param id The spotify album id.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example const album = await client.albums.get('id');
     */
    get(id: string, force?: boolean): Promise<Album | null>;
    /**
     * Get the information of multiple albums in one fetch.
     *
     * @param ids An array of spotify ids.
     * @example const albums = await client.albums.getMultiple(['id1', 'id2']);
     */
    getMultiple(ids: string[]): Promise<Album[]>;
    /**
     * Get the information about the album's tracks.
     *
     * @param id The spotify album id.
     * @example const tracks = await client.albums.getTracks('id');
     */
    getTracks(id: string): Promise<Track[]>;
}
