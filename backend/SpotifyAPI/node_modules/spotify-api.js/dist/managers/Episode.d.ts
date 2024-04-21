import type { Client } from "../Client";
import type { SearchOptions } from "../Interface";
import type { Episode } from "../structures/Episode";
/**
 * A manager to perform actions which belongs to the spotify episode web api.
 */
export declare class EpisodeManager {
    client: Client;
    /**
     * A manager to perform actions which belongs to the spotify episode web api.
     *
     * @param client The spotify api client.
     * @example const episodes = new EpisodeManager(client);
     */
    constructor(client: Client);
    /**
     * Search for spotify episodes with query.
     *
     * @param query The query to search.
     * @param options Some search options to make the search more efficient.
     * @example const results = await client.episodes.search('some search');
     */
    search(query: string, options?: SearchOptions): Promise<Episode[]>;
    /**
     * Get an episode's information.
     *
     * @param id The spotify episode id.
     * @param market Only episodes that are available in that market will be returned.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example const episode = await client.episodes.get('id');
     */
    get(id: string, market?: string, force?: boolean): Promise<Episode | null>;
    /**
     * Get the information of multiple spotify episodes in one fetch.
     *
     * @param ids An array of spotify ids.
     * @param market Only episodes that are available in that market will be returned.
     * @example const episodes = await client.episodes.getMultiple(['id1', 'id2']);
     */
    getMultiple(ids: string[], market?: string): Promise<Episode[]>;
}
