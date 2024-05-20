import type { Client } from "../Client";
import type { CursorPaging, Device, PlayHistory } from "spotify-types";
import type { CamelCaseObjectKeys, CurrentPlayback, CurrentlyPlaying, RecentlyPlayed } from "../Interface";
/**
 * Creates a device structure.
 *
 * @param data The raw device.
 * @example const devices = createDevice(device);
 */
export declare function createDevice(data: Device): CamelCaseObjectKeys<Device>;
/**
 * Create the current playback structure.
 *
 * @param client The spotify client.
 * @param data The data from the spotify api.
 * @example const currentPlayback = createCurrentPlayback(client, fetchedData);
 */
export declare function createCurrentPlayback(client: Client, data: any): CurrentPlayback;
/**
 * Create the object structure containing the currently playing details.
 *
 * @param client The spotify client.
 * @param data The data from the spotify api.
 * @example const currentlyPlaying = createCurrentlyPlaying(client, fetchedData);
 */
export declare function createCurrentlyPlaying(client: Client, data: any): CurrentlyPlaying;
/**
 * Creates a recently played structure containg the playhistory details.
 *
 * @param client The spotify api client.
 * @param data The raw data fetched from the spotify api.
 * @example const recentlyPlayed = createRecentlyPlayed(client, data);
 */
export declare function createRecentlyPlayed(client: Client, data: CursorPaging<PlayHistory>): RecentlyPlayed;
