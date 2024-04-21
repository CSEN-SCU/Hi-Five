import type { Client } from "../Client";
import type { SearchOptions } from "../Interface";
import type { Show } from "../structures/Show";
import type { Episode } from "../structures/Episode";
/**
 * A manager to perform actions which belongs to the spotify show web api.
 */
export declare class ShowManager {
    client: Client;
    /**
     * A manager to perform actions which belongs to the spotify show web api.
     *
     * @param client The spotify api client.
     * @example const shows = new ShowManager(client);
     */
    constructor(client: Client);
    /**
     * Search for spotify shows with query.
     *
     * @param query The query to search.
     * @param options Some search options to make the search more efficient.
     * @example const results = await client.shows.search('some search');
     */
    search(query: string, options?: SearchOptions): Promise<Show[]>;
    /**
     * Get an show's information.
     *
     * @param id The spotify show id.
     * @param market Only shows that are available in that market will be returned.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example const show = await client.shows.get('id');
     */
    get(id: string, market?: string, force?: boolean): Promise<Show | null>;
    /**
     * Get the information of multiple spotify shows in one fetch.
     *
     * @param ids An array of spotify ids.
     * @param market Only shows that are available in that market will be returned.
     * @example const shows = await client.shows.getMultiple(['id1', 'id2']);
     */
    getMultiple(ids: string[], market?: string): Promise<Show[]>;
    /**
     * Get the information of the episodes of the show.
     *
     * @param id The spotify show id.
     * @param options The limit, offset, market query paramater options.
     * @example const episodes = await client.shows.getEpisodes('id');
     */
    getEpisodes(id: string, options?: {
        limit?: number;
        offset?: number;
        market?: string;
    }): Promise<Episode[]>;
}
