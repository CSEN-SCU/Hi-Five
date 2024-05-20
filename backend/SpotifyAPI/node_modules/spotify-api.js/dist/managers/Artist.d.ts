import type { Client } from "../Client";
import type { Artist } from "../structures/Artist";
import type { Track } from "../structures/Track";
import type { Album } from "../structures/Album";
import type { SearchOptions } from "../Interface";
import type { AlbumGroup } from "spotify-types";
/**
 * A manager to perform actions which belongs to the spotify artist web api.
 */
export declare class ArtistManager {
    client: Client;
    /**
     * A manager to perform actions which belongs to the spotify artist web api.
     *
     * @param client The spotify api client.
     * @example const artists = new ArtistManager(client);
     */
    constructor(client: Client);
    /**
     * Search for spotify artists with query.
     *
     * @param query The query to search.
     * @param options Some search options to make the search more efficient.
     * @example const results = await client.artists.search('some search');
     */
    search(query: string, options?: SearchOptions): Promise<Artist[]>;
    /**
     * Get an artist's information.
     *
     * @param id The spotify artist id.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example const artist = await client.artists.get('id');
     */
    get(id: string, force?: boolean): Promise<Artist | null>;
    /**
     * Get the information of multiple spotify artists in one fetch.
     *
     * @param ids An array of spotify ids.
     * @example const artists = await client.artists.getMultiple(['id1', 'id2']);
     */
    getMultiple(ids: string[]): Promise<Artist[]>;
    /**
     * Get the information of top tracks from the spotify artist.
     *
     * @param id The spotify artist id.
     * @param market The market query option.
     * @example const topTracks = await client.artists.getTopTracks('id');
     */
    getTopTracks(id: string, market?: string): Promise<Track[]>;
    /**
     * Get the information of the artists who are related to a paticular artist.
     *
     * @param id The spotify artist id.
     * @example const relatedArtists = await client.artists.getRelatedArtists('id');
     */
    getRelatedArtists(id: string): Promise<Artist[]>;
    /**
     * Get the informations of albums of the artist.
     *
     * @param id The spotify artist id.
     * @param options The options necessary to get the albums in a sorted way.
     * @example const albums = await client.artists.getAlbums('id');
     */
    getAlbums(id: string, options?: {
        includeGroups?: AlbumGroup;
        market?: string;
        limit?: number;
        offset?: number;
    }): Promise<Album[]>;
    /**
     * Follow one or many artists.
     * This method requires an user authorized token.
     *
     * @param ids The array of artist ids.
     * @example await client.artists.follow('id1', 'id2');
     */
    follow(...ids: string[]): Promise<boolean>;
    /**
     * Unfollow one or many artists.
     * This method requires an user authorized token.
     *
     * @param ids The array of artist ids.
     * @example await client.artists.unfollow('id1', 'id2');
     */
    unfollow(...ids: string[]): Promise<boolean>;
}
