import type { Client } from "../Client";
import type { User } from "./User";
import type { PlaylistTrack } from "../Interface";
import type { Playlist as RawPlaylist, PlaylistTrack as RawPlaylistTrack, SimplifiedPlaylist, SpotifyType, Image, ExternalUrl } from "spotify-types";
/**
 * Spotify api's playlist object.
 */
export declare class Playlist {
    /**
     * True if the owner allows other users to modify the playlist.
     */
    collaborative: boolean;
    /**
     * The playlist description. Only returned for modified, verified playlists, otherwise null.
     */
    description: string | null;
    /**
     *  Known external URLs for this playlist.
     */
    externalURL: ExternalUrl;
    /**
     * The Spotify ID for the playlist.
     */
    id: string;
    /**
     * Images for the playlist. The array may be empty or contain up to three images.
     */
    images: Image[];
    /**
     * The name of the playlist.
     */
    name: string;
    /**
     * The user who owns the playlist.
     */
    owner: User;
    /**
     * The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version
     */
    snapshotID: string;
    /**
     * The total number of tracks in the playlist.
     */
    totalTracks: number;
    /**
     * The Spotify URI for the playlist.
     */
    uri: string;
    /**
     * The object type: “playlist”
     */
    type: SpotifyType;
    /**
     * The total number of followers of the playlist.
     */
    totalFollowers?: number;
    /**
     * The playlist’s public/private status: true the playlist is public, false the playlist is private, null the playlist status is not relevant.
     */
    public?: boolean;
    /**
     * Information about the tracks of the playlist. Note, a track object may be null. This can happen if a track is no longer available.
     */
    tracks?: PlaylistTrack[];
    /**
     * To create a js object conataing camel case keys of the SimplifiedPlaylist and Playlist data with additional functions.
     *
     * @param data The raw data received from the api.
     * @param client The spotify client.
     * @example const playlist = new Playlist(fetchedData, client);
     */
    constructor(data: SimplifiedPlaylist | RawPlaylist, client: Client);
    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    makeCodeImage(color?: string): string;
}
/**
 * Create playlist tracks structure.
 *
 * @param client The spotify client.
 * @param rawPlaylistTracks The raw data received from the api.
 * @example const playlistTracks = createPlaylistTracks(client, data);
 */
export declare function createPlaylistTracks(client: Client, rawPlaylistTracks: RawPlaylistTrack[]): PlaylistTrack[];
