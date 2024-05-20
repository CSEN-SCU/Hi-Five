import type { Client } from "../Client";
import type { Album } from "../structures/Album";
import type { Playlist } from "../structures/Playlist";
import type { FeaturedPlaylistContent, Recommendations } from "../Interface";
import type { Category, RecommendationQuery } from "spotify-types";
/**
 * A manager to perform actions which belongs to the spotify browse web api.
 */
export declare class BrowseManager {
    client: Client;
    /**
     * A manager to perform actions which belongs to the spotify browse web api.
     *
     * @param client The spotify api client.
     * @example const browse = new BrowseManager(client);
     */
    constructor(client: Client);
    /**
     * Get all the new album releases.
     *
     * @param options The country, offset, limit query parameters options.
     * @example const albums = await browse.getNewReleases();
     */
    getNewReleases(options?: {
        country?: string;
        offset?: number;
        limit?: number;
    }): Promise<Album[]>;
    /**
     * Get the featured playlists.
     *
     * @param options The country, locale, timestamp, offset, limit query parameters options.
     * @example const playlists = await browse.getFeaturedPlaylists();
     */
    getFeaturedPlaylists(options?: {
        country?: string;
        locale?: string;
        timestamp?: string;
        offset?: number;
        limit?: number;
    }): Promise<FeaturedPlaylistContent | null>;
    /**
     * Get an array of all categories.
     *
     * @param options The country, locale, offset, limit query parameters options.
     * @example const categories = await browse.getCategories();
     */
    getCategories(options?: {
        country?: string;
        locale?: string;
        offset?: number;
        limit?: number;
    }): Promise<Category[]>;
    /**
     * Get the brief information about a paticular category.
     *
     * @param id The category id.
     * @param options The country, locale query parameters options.
     * @example const category = await browse.getCategory('party');
     */
    getCategory(id: string, options?: {
        country?: string;
        locale?: string;
    }): Promise<Category | null>;
    /**
     * Get the playlists of a paticular category.
     *
     * @param id The spotify category id.
     * @param options The country, offset, limit query parameters options.
     * @example const playlists = await browse.getCategoryPlaylists('party');
     */
    getCategoryPlaylists(id: string, options?: {
        country?: string;
        offset?: number;
        limit?: number;
    }): Promise<Playlist[]>;
    /**
     * Get all the recommendations from the api sorted by the [RecommendationQuery] structure.
     *
     * @param options The [RecommendationQuery] options structure which will be sent as query paramaters.
     * @example
     * const genres = await browse.getRecommendations({
     *     seed_artists: 'artists_id',
     *     seed_genre: 'genre',
     *     seed_tracks: 'tracks
     * });
     */
    getRecommendations(options: RecommendationQuery): Promise<Recommendations | null>;
    /**
     * Get all the recommendation genres.
     *
     * @example const genres = await browse.getRecommendationGenreSeeds();
     */
    getRecommendationGenreSeeds(): Promise<Record<'genres', string[]>>;
    /**
     * Get all the available markets.
     *
     * @example const { markets } = await client.browse.getMarkets();
     */
    getAvailableMarkets(): Promise<Record<'markets', string[]>>;
}
