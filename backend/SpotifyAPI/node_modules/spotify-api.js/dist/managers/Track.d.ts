import type { Client } from "../Client";
import type { SearchOptions } from "../Interface";
import type { Track } from "../structures/Track";
import type { AudioAnalysis, AudioFeatures } from "spotify-types";
/**
 * A manager to perform actions which belongs to the spotify track web api.
 */
export declare class TrackManager {
    client: Client;
    /**
     * A manager to perform actions which belongs to the spotify track web api.
     *
     * @param client The spotify api client.
     * @example const tracks = new TrackManager(client);
     */
    constructor(client: Client);
    /**
     * Search for spotify tracks with query.
     *
     * @param query The query to search.
     * @param options Some search options to make the search more efficient.
     * @example const results = await client.tracks.search('some search');
     */
    search(query: string, options?: SearchOptions): Promise<Track[]>;
    /**
     * Get an track's information.
     *
     * @param id The spotify track id.
     * @param market Only tracks that are available in that market will be returned.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example const track = await client.tracks.get('id');
     */
    get(id: string, market?: string, force?: boolean): Promise<Track | null>;
    /**
     * Get the information of multiple spotify tracks in one fetch.
     *
     * @param ids An array of spotify ids.
     * @param market Only tracks that are available in that market will be returned.
     * @example const tracks = await client.tracks.getMultiple(['id1', 'id2']);
     */
    getMultiple(ids: string[], market?: string): Promise<Track[]>;
    /**
     * Get the audio features of the track.
     * Returned type [AudioFeatures] is not a camelcased object.
     *
     * @param id The spotify track id.
     * @example const audioFeatures = await client.tracks.getAudioFeatures('id');
     */
    getAudioFeatures(id: string): Promise<AudioFeatures | null>;
    /**
     * Get audio features of multiple tracks.
     * Returned type [AudioFeatures[]] is not a camelcased object.
     *
     * @param ids The array of spotify ids.
     * @example const audioFeatures = await client.tracks.getMultipleAudioFeatures('id1', 'is2');
     */
    getMultipleAudioFeatures(...ids: string[]): Promise<AudioFeatures[]>;
    /**
     * Get the audio analysis of the track.
     * Returned type [AudioAnalysis] is not a camelcase object and not documented.
     *
     * @param id The spotify playlist id.
     * @example const audioAnalysis = await client.tracks.getAudioAnalysis('id');
     */
    getAudioAnalysis(id: string): Promise<AudioAnalysis | null>;
}
