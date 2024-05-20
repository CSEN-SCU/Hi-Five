import type { Client } from "../Client";
import type { Artist } from "./Artist";
import type { Track } from "./Track";
import type { SimplifiedAlbum, Album as RawAlbum, SpotifyType, Restriction, Image, AlbumType, ExternalUrl, Copyright, ExternalID } from "spotify-types";
/**
 * Spotify api's album object.
 */
export declare class Album {
    /**
     * The field is present when getting an artist’s albums.
     */
    albumGroup?: 'album' | 'single' | 'compilation' | 'appears_on';
    /**
     * The type of album.
     */
    albumType: AlbumType;
    /**
     * The artists of the album.
     */
    artists: Artist[];
    /**
     * The markets in which the album is available.
     */
    availableMarkets: string[];
    /**
     * Known external URLs for this album.
     */
    externalURL: ExternalUrl;
    /**
     * The Spotify ID of the album.
     */
    id: string;
    /**
     * The cover art for the album in various sizes, widest first.
     */
    images: Image[];
    /**
     * The name of the album.
     */
    name: string;
    /**
     * The date the album was first released, for example “1981-12-15”.
     */
    releaseDate: string;
    /**
     * The precision with which release_date value is known: “year” , “month” , or “day”.
     */
    releaseDatePrecision: string;
    /**
     * Included in the response when a content restriction is applied.
     */
    restrictions: Restriction[];
    /**
     * The total number of tracks in the album.
     */
    totalTracks: number;
    /**
     * The object type which will be 'album'.
     */
    type: SpotifyType;
    /**
     * The Spotify URI for the album.
     */
    uri: string;
    /**
     * The copyright statements of the album.
     */
    copyrights?: Copyright[];
    /**
     * Known external IDs for the album.
     */
    externalID?: ExternalID;
    /**
     * A list of the genres used to classify the album. For example: “Prog Rock” , “Post-Grunge”. (If not yet classified, the array is empty.)
     */
    genres?: string[];
    /**
     * The label for the album.
     */
    label?: string;
    /**
     * The popularity of the album. The value will be between 0 and 100, with 100 being the most popular. The popularity is calculated from the popularity of the album’s individual tracks.
     */
    popularity?: number;
    /**
     * The tracks of the album.
     */
    tracks?: Track[];
    /**
     * To create a js object conataing camel case keys of the SimplifiedAlbum and Album data with additional functions.
     *
     * @param data The raw data received from the api.
     * @param client The spotify client.
     * @example const album = new Album(fetchedData, client);
     */
    constructor(data: SimplifiedAlbum | RawAlbum, client: Client);
    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    makeCodeImage(color?: string): string;
}
