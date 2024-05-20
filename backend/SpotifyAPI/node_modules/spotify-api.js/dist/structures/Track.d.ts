import type { ExternalID, ExternalUrl, Restriction, SimplifiedTrack, SpotifyType, Track as RawTrack } from "spotify-types";
import type { LinkedTrack } from "../Interface";
import type { Client } from "../Client";
import type { Artist } from "./Artist";
import type { Album } from "./Album";
/**
 * Spotify api's track object.
 */
export declare class Track {
    /**
     * The artists who performed the track. Each artist object includes a link in href to more detailed information about the artist.
     */
    artists: Artist[];
    /**
     * A list of the countries in which the track can be played.
     */
    availableMarkets: string[];
    /**
     * The disc number (usually 1 unless the album consists of more than one disc).
     */
    discNumber: number;
    /**
     * The track length in milliseconds.
     */
    duration: number;
    /**
     * Whether or not the track has explicit lyrics ( true = yes it does; false = no it does not OR unknown).
     */
    explicit: boolean;
    /**
     * External URLs for this track.
     */
    externalURL: ExternalUrl;
    /**
     * The Spotify ID for the track.
     */
    id: string;
    /**
     * Whether or not the track is from a local file.
     */
    isLocal: boolean;
    /**
     * Part of the response when Track Relinking is applied. If true , the track is playable in the given market. Otherwise false.
     */
    isPlayable?: boolean;
    /**
     * Part of the response when Track Relinking is applied and is only part of the response if the track linking, in fact, exists.
     */
    linkedFrom?: LinkedTrack;
    /**
     * The name of the track.
     */
    name: string;
    /**
     * A URL to a 30 second preview (MP3 format) of the track.
     */
    previewURL: string;
    /**
     * Included in the response when a content restriction is applied.
     */
    restrictions: Restriction[];
    /**
     * The number of the track. If an album has several discs, the track number is the number on the specified disc.
     */
    trackNumber: number;
    /**
     * The object type: “track”.
     */
    type: SpotifyType;
    /**
     * The Spotify URI for the track.
     */
    uri: string;
    /**
     * The album on which the track appears.
     */
    album?: Album;
    /**
     * Known external IDs for the track.
     */
    externalID?: ExternalID;
    /**
     * The popularity of the track. The value will be between 0 and 100, with 100 being the most popular. \\
     */
    popularity?: number;
    /**
     * To create a js object conataing camel case keys of the SimplifiedTrack and Track data with additional functions.
     *
     * @param data The raw data received from the api.
     * @param client The spotify client.
     * @example const track = new Track(fetchedData, client);
     */
    constructor(data: SimplifiedTrack | RawTrack, client: Client);
    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    makeCodeImage(color?: string): string;
}
