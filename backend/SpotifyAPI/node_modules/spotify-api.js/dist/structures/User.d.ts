import type { PublicUser, SpotifyType, ExternalUrl, Image } from "spotify-types";
/**
 * Spotify api's user object.
 */
export declare class User {
    /**
     * The name displayed on the user’s profile. null if not available.
     */
    displayName: string | null;
    /**
     * The Spotify user ID for the user.
     */
    id: string;
    /**
     * The Spotify URI for the user.
     */
    uri: string;
    /**
     * The Spotify object type which will be 'user'.
     */
    type: SpotifyType;
    /**
     * The user’s profile image.
     */
    images: Image[];
    /**
     * Information about the followers of the user.
     */
    totalFollowers?: number;
    /**
     * Known external URLs for this user.
     */
    externalURL: ExternalUrl;
    /**
     * To create a js object conataing camel case keys of the PublicUser data with additional functions.
     *
     * @param client The spotify client.
     * @example const user = new User(fetchedData);
     */
    constructor(data: PublicUser);
    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    makeCodeImage(color?: string): string;
}
