import type { Client } from "../Client";
import type { Show } from "./Show";
import type { CamelCaseObjectKeys } from "../Interface";
import type { SimplifiedEpisode, Episode as RawEpisode, ExternalUrl, Image, Restriction, ResumePoint, SpotifyType } from "spotify-types";
/**
 * Spotify api's episode object.
 */
export declare class Episode {
    /**
     * A URL to a 30 second preview (MP3 format) of the episode. null if not available.
     */
    audioPreviewURL?: string;
    /**
     * A description of the episode. HTML tags are stripped away from this field, use html_description field in case HTML tags are needed.
     */
    description: string;
    /**
     * The episode length in milliseconds.
     */
    duration: number;
    /**
     * Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown).
     */
    explicit: boolean;
    /**
     * External URLs for this episode
     */
    externalURL: ExternalUrl;
    /**
     * A description of the episode. This field may contain HTML tags.
     */
    htmlDescription: string;
    /**
     * The Spotify ID for the episode.
     */
    id: string;
    /**
     * The cover art for the episode in various sizes, widest first.
     */
    images: Image[];
    /**
     * True if the episode is hosted outside of Spotify’s CDN.
     */
    isExternallyHosted: boolean;
    /**
     * True if the episode is playable in the given market. Otherwise false.
     */
    isPlayable: boolean;
    /**
     * A list of the languages used in the episode, identified by their ISO 639 code.
     */
    languages: string[];
    /**
     * The name of the episode.
     */
    name: string;
    /**
     * The date the episode was first released, for example "1981-12-15". Depending on the precision, it might be shown as "1981" or "1981-12".
     */
    releaseDate: string;
    /**
     * The precision with which release_date value is known: "year", "month", or "day".
     */
    releaseDatePrecision: string;
    /**
     * Included in the response when a content restriction is applied.
     */
    restrictions: Restriction[];
    /**
     * The user’s most recent position in the episode. Set if the supplied access token is a user token and has the scope ‘user-read-playback-position’.
     */
    resumePoint?: CamelCaseObjectKeys<ResumePoint>;
    /**
     * The object type: “episode”.
     */
    type: SpotifyType;
    /**
     * The Spotify URI for the episode
     */
    uri: string;
    /**
     * The show which the episode belongs to.
     */
    show?: Show;
    /**
     * To create a js object conataing camel case keys of the SimplifiedEpisode and Episode data with additional functions.
     *
     * @param client The spotify client.
     * @example const episode = new Episode(fetchedData, client);
     */
    constructor(data: SimplifiedEpisode | RawEpisode, client: Client);
    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    makeCodeImage(color?: string): string;
}
