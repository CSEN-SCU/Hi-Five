import type { Client } from "../Client";
import type { Episode } from "./Episode";
import type { SimplifiedShow, Show as RawShow, Copyright, ExternalUrl, Image, SpotifyType } from "spotify-types";
/**
 * Spotify api's show object.
 */
export declare class Show {
    /**
     * A list of the countries in which the show can be played, identified by their ISO 3166-1 alpha-2 code.
     */
    availableMarkets: string[];
    /**
     * The copyright statements of the show.
     */
    copyrights: Copyright[];
    /**
     * A description of the show. HTML tags are stripped away from this field, use html_description field in case HTML tags are needed.
     */
    description: string;
    /**
     * Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown).
     */
    explicit: boolean;
    /**
     * External URLs for this show.
     */
    externalURL: ExternalUrl;
    /**
     * A description of the show. This field may contain HTML tags.
     */
    htmlDescription: string;
    /**
     * The Spotify ID for the show.
     */
    id: string;
    /**
     * The cover art for the show in various sizes, widest first.
     */
    images: Image[];
    /**
     * True if all of the show’s episodes are hosted outside of Spotify’s CDN. This field might be null in some cases.
     */
    isExternallyHosted: boolean;
    /**
     * A list of the languages used in the show, identified by their ISO 639 code.
     */
    languages: string[];
    /**
     * The media type of the show.
     */
    mediaType: string;
    /**
     * The name of the show.
     */
    name: string;
    /**
     * The publisher of the show.
     */
    publisher: string;
    /**
     * The object type: “show”.
     */
    type: SpotifyType;
    /**
     * The Spotify URI for the show.
     */
    uri: string;
    /**
     * The episodes of the show.
     */
    episodes?: Episode[];
    /**
     * To create a js object conataing camel case keys of the SimplifiedShow and Show data with additional functions.
     *
     * @param client The spotify client.
     * @example const show = new Show(fetchedData, client);
     */
    constructor(data: SimplifiedShow | RawShow, client: Client);
    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    makeCodeImage(color?: string): string;
}
