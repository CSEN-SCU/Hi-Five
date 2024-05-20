import type { SimplifiedArtist, Artist as RawArtist, SpotifyType, ExternalUrl, Image } from "spotify-types";
/**
 * Spotify api's user object.
 */
export declare class Artist {
    /**
     * Known external URLs for this artist.
     */
    externalURL: ExternalUrl;
    /**
     * The Spotify ID for the artist.
     */
    id: string;
    /**
     * The name of the artist.
     */
    name: string;
    /**
     * The object type: "artist".
     */
    type: SpotifyType;
    /**
     * The Spotify URI for the artist.
     */
    uri: string;
    /**
     * Total number of followers of the artist.
     */
    totalFollowers?: number;
    /**
     * A list of the genres the artist is associated with. For example: "Prog Rock" , "Post-Grunge". (If not yet classified, the array is empty.)
     */
    genres?: string[];
    /**
     * Images of the artist in various sizes, widest first.
     */
    images?: Image[];
    /**
     * The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist’s popularity is calculated from the popularity of all the artist’s tracks.
     */
    popularity?: number;
    /**
     * To create a js object containing camel case keys of SimplifiedArtist or Artist data with additional functions.
     *
     * @param data The raw data received from the api.
     * @example const artist = new Artist(fetchedData);
     */
    constructor(data: SimplifiedArtist | RawArtist);
    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    makeCodeImage(color?: string): string;
}
