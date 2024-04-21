import type { Client } from "../Client";
import type { CamelCaseObjectKeys, Saved, TimeRange } from "../Interface";
import type { Playlist } from "../structures/Playlist";
import type { Artist } from "../structures/Artist";
import type { Track } from "../structures/Track";
import type { Episode } from "../structures/Episode";
import type { Show } from "../structures/Show";
import type { Album } from "../structures/Album";
import { Player } from "./Player";
import type { SpotifyType, Image, ExternalUrl, UserProductType, ExplicitContentSettings, CreatePlaylistQuery } from "spotify-types";
/**
 * The client which handles all the current user api endpoints and with the details of the current user.
 */
export declare class UserClient {
    /**
     * The spotify client for this UserClient to work with.
     */
    readonly client: Client;
    /**
     * The manager for the player api endpoints.
     */
    player: Player;
    /**
     * The name displayed on the user’s profile. null if not available.
     */
    displayName?: string | null;
    /**
     * The Spotify user ID for the user.
     */
    id: string;
    /**
     * The Spotify URI for the user.
     */
    uri?: string;
    /**
     * The Spotify object type which will be 'user'.
     */
    type?: SpotifyType;
    /**
     * The user’s profile image.
     */
    images?: Image[];
    /**
     * Information about the followers of the user.
     */
    totalFollowers?: number;
    /**
     * Known external URLs for this user.
     */
    externalURL?: ExternalUrl;
    /**
     * The spotify subscription level of the user. If the user has the paticualr authorized scope for it.
     */
    product?: UserProductType;
    /**
     * The country of the user, as set in the user’s account profile.
     */
    country?: string;
    /**
     * The user’s email address, as entered by the user when creating their account.
     */
    email?: string;
    /**
     * The user’s explicit content settings.
     */
    explicitContent?: CamelCaseObjectKeys<ExplicitContentSettings>;
    /**
     * The client which handles all the current user api endpoints with the details of the current user.
     * All the methods in this class requires the user authorized token.
     *
     * @param client The spotify api client.
     * @example const user = new UserClient(client);
     */
    constructor(client: Client);
    /**
     * Patches the current user details info to this manager.
     */
    patchInfo(): Promise<this>;
    /**
     * Get the list of playlists of the current user.
     *
     * @param options The limit, offset query parameter options.
     * @param fetchAll Retrieve all playlist at once if more than 50.
     * @example const playlists = await client.user.getPlaylists();
     */
    getPlaylists(options?: {
        limit?: number;
        offset?: number;
    }, fetchAll?: boolean): Promise<Playlist[]>;
    /**
     * Create a playlist.
     *
     * @param playlist The playlist details to set.
     * @example const playlist = await client.user.createPlaylist({ name: 'My playlist' });
     */
    createPlaylist(playlist: CreatePlaylistQuery): Promise<Playlist | null>;
    /**
     * Verify if the current user follows a paticular playlist.
     *
     * @param playlistID The id of the spotify playlist.
     * @example const currentUserFollows = await client.user.followsPlaylist('id');
     */
    followsPlaylist(playlistID: string): Promise<boolean>;
    /**
     * Verify if the current user follows one or more artists.
     *
     * @param ids The array of spotify artist ids.
     * @example const [followsArtist] = await client.user.followsArtists('id1');
     */
    followsArtists(...ids: string[]): Promise<boolean[]>;
    /**
     * Verify if the current user follows one or more users.
     *
     * @param ids The array of spotify user ids.
     * @example const [followsUser] = await client.user.followsUsers('id1');
     */
    followsUsers(...ids: string[]): Promise<boolean[]>;
    /**
     * Get an array of artists who are been followed by the current usser.
     *
     * @param options The limit, after query parameters. The after option is the last artist ID retrieved from the previous request.
     * @example const artists = await client.user.getFollowingArtists();
     */
    getFollowingArtists(options?: {
        limit?: number;
        after?: string;
    }): Promise<Artist[]>;
    /**
     * Get the top tracks of the user based on the current user's affinity.
     *
     * @param options The timeRange, limit, offset query paramaters.
     * @example const topTracks = await client.user.getTopTracks();
     */
    getTopTracks(options?: {
        timeRange?: TimeRange;
        limit?: number;
        offset?: number;
    }): Promise<Track[]>;
    /**
     * Get the top artists of the user based on the current user's affinity.
     *
     * @param options The timeRange, limit, offset query paramaters.
     * @example const topArtists = await client.user.getTopArtists();
     */
    getTopArtists(options?: {
        timeRange?: TimeRange;
        limit?: number;
        offset?: number;
    }): Promise<Artist[]>;
    /**
     * Get all the saved albums of the current user.
     *
     * @param options The limit, offset, market query paramaters.
     * @example const savedAlbums = await client.user.getSavedAlbums();
     */
    getSavedAlbums(options: {
        limit?: number;
        offset?: number;
        market?: string;
    }): Promise<Saved<Album>[]>;
    /**
     * Save albums to the current user library.
     *
     * @param ids The array of spotify user ids.
     * @example await client.user.saveAlbums('id1', 'id2');
     */
    saveAlbums(...ids: string[]): Promise<boolean>;
    /**
     * Remove albums from the current user library.
     *
     * @param ids The array of spotify user ids.
     * @example await client.user.removeAlbums('id1', 'id2');
     */
    removeAlbums(...ids: string[]): Promise<boolean>;
    /**
     * Verify if the current user has a paticular one or more albums.
     *
     * @param ids The array of spotify album ids.
     * @example const [hasFirstAlbum, hasSecondAlbum] = await client.user.hasAlbums('id1', 'id2');
     */
    hasAlbums(...ids: string[]): Promise<boolean[]>;
    /**
     * Get all the saved tracks of the current user.
     *
     * @param options The limit, offset, market query paramaters.
     * @example const savedTracks = await client.user.getSavedTracks();
     */
    getSavedTracks(options: {
        limit?: number;
        offset?: number;
        market?: string;
    }): Promise<Saved<Track>[]>;
    /**
     * Save tracks to the current user library.
     *
     * @param ids The array of spotify user ids.
     * @example await client.user.saveTracks('id1', 'id2');
     */
    saveTracks(...ids: string[]): Promise<boolean>;
    /**
     * Remove tracks from the current user library.
     *
     * @param ids The array of spotify user ids.
     * @example await client.user.removeTracks('id1', 'id2');
     */
    removeTracks(...ids: string[]): Promise<boolean>;
    /**
     * Verify if the current user has a paticular one or more tracks.
     *
     * @param ids The array of spotify track ids.
     * @example const [hasFirstTrack, hasSecondTrack] = await client.user.hasTracks('id1', 'id2');
     */
    hasTracks(...ids: string[]): Promise<boolean[]>;
    /**
     * Get all the saved episodes of the current user.
     *
     * @param options The limit, offset, market query paramaters.
     * @example const savedEpisodes = await client.user.getSavedEpisodes();
     */
    getSavedEpisodes(options: {
        limit?: number;
        offset?: number;
        market?: string;
    }): Promise<Saved<Episode>[]>;
    /**
     * Save episodes to the current user library.
     *
     * @param ids The array of spotify user ids.
     * @example await client.user.saveEpisodes('id1', 'id2');
     */
    saveEpisodes(...ids: string[]): Promise<boolean>;
    /**
     * Remove episodes from the current user library.
     *
     * @param ids The array of spotify user ids.
     * @example await client.user.removeEpisodes('id1', 'id2');
     */
    removeEpisodes(...ids: string[]): Promise<boolean>;
    /**
     * Verify if the current user has a paticular one or more episodes.
     *
     * @param ids The array of spotify episode ids.
     * @example const [hasFirstEpisode, hasSecondEpisode] = await client.user.hasEpisodes('id1', 'id2');
     */
    hasEpisodes(...ids: string[]): Promise<boolean[]>;
    /**
     * Get all the saved shows of the current user.
     *
     * @param options The limit, offset, market query paramaters.
     * @example const savedShows = await client.user.getSavedShows();
     */
    getSavedShows(options: {
        limit?: number;
        offset?: number;
        market?: string;
    }): Promise<Saved<Show>[]>;
    /**
     * Save shows to the current user library.
     *
     * @param ids The array of spotify user ids.
     * @example await client.user.saveShows('id1', 'id2');
     */
    saveShows(...ids: string[]): Promise<boolean>;
    /**
     * Remove shows from the current user library.
     *
     * @param ids The array of spotify user ids.
     * @example await client.user.removeShows('id1', 'id2');
     */
    removeShows(...ids: string[]): Promise<boolean>;
    /**
     * Verify if the current user has a paticular one or more shows.
     *
     * @param ids The array of spotify show ids.
     * @example const [hasFirstShow, hasSecondShow] = await client.user.hasShows('id1', 'id2');
     */
    hasShows(...ids: string[]): Promise<boolean[]>;
}
