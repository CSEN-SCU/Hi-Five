import type { Device, Cursor } from "spotify-types";
import type { Client } from "../Client";
import type { CamelCaseObjectKeys, CurrentPlayback, RecentlyPlayed } from "../Interface";
/**
 * A manager to perform actions which belongs to the spotify player web api.
 */
export declare class Player {
    /**
     * The spotify client.
     */
    readonly client: Client;
    /**
     * The client which handles all the current user's player api endpoints.
     * All the methods in this class requires the user authorized token.
     * Few functions requires spotify premium.
     *
     * @param client The spotify api client.
     * @example const player = new Player(client);
     */
    constructor(client: Client);
    /**
     * Get the current playback of the current user's player.
     *
     * @param additionalTypes A comma-separated list of item types that your client supports besides the default track type. Valid types are: track and episode.
     * @example const currentPlayback = await player.getCurrentPlayback();
     */
    getCurrentPlayback(additionalTypes?: 'track' | 'episode'): Promise<CurrentPlayback | null>;
    /**
     * Get the current playing content of the current user's player.
     *
     * @param additionalTypes A comma-separated list of item types that your client supports besides the default track type. Valid types are: track and episode.
     * @example const currentPlayback = await player.getCurrentlyPlaying();
     */
    getCurrentlyPlaying(additionalTypes?: 'track' | 'episode'): Promise<CurrentPlayback | null>;
    /**
     * Get the recently played data from the current user's player.
     *
     * @param options The before, after and limit query paramaeters.
     * @example const recentlyPlayed = await player.getRecentlyPlayed();
     */
    getRecentlyPlayed(options?: Partial<Cursor> & {
        limit?: number;
    }): Promise<RecentlyPlayed>;
    /**
     * Get the active devices which are logged into the current user's spotify account.
     * @example const devices = await player.getDevices();
     */
    getDevices(): Promise<CamelCaseObjectKeys<Device>[]>;
    /**
     * Transfer the playback to an another device.
     * This method requires a spotify premium account.
     *
     * @param deviceID The device id to be transferred.
     * @param play The playback state to set by default it is false.
     * @example await player.transferPlayback('deviceID');
     */
    transferPlayback(deviceID: string, play?: boolean): Promise<boolean>;
    /**
     * Play or resume the current user's playback.
     * This method requires a spotify premium account.
     * This methods uses the [/me/player/play] endpoint which does not has complete documentation.
     *
     * **Options for the function:**
     * - `deviceID` The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
     * - `contextURI` Not documented.
     * - `uris` Not documented.
     * - `offset` Not documented.
     * - `position` To seek to a position while playing.
     *
     * @param options The deviceID, contextURI, uris, offset and position parameter.
     * @example await player.play();
     */
    play(options?: {
        deviceID?: string;
        contextURI?: string;
        uris?: string[];
        offset?: number;
        position?: number;
    }): Promise<boolean>;
    /**
     * Pause the current user's playback.
     * This method requires a spotify premium account.
     *
     * @param deviceID The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
     * @example await player.pause();
     */
    pause(deviceID?: string): Promise<boolean>;
    /**
     * Skip to the next track in the current user's playback.
     * This method requires a spotify premium account.
     *
     * @param deviceID The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
     * @example await player.skip();
     */
    skip(deviceID?: string): Promise<boolean>;
    /**
     * Skip to the previous track in the current user's playback.
     * This method requires a spotify premium account.
     *
     * @param deviceID The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
     * @example await player.previous();
     */
    previous(deviceID?: string): Promise<boolean>;
    /**
     * Seek to a paticular position in the current user's player.
     * This method requires a spotify premium account.
     *
     * @param position The position in milliseconds to seek to. Must be a positive number. Passing in a position that is greater than the length of the track will cause the player to start playing the next song.
     * @param deviceID The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
     * @example await player.seek(10000);
     */
    seek(position: number, deviceID?: string): Promise<boolean>;
    /**
     * Set the repeat mode for the user’s playback.
     * This method requires a spotify premium account.
     *
     * @param state State should be track, context or off. **track** will repeat the current track. **context** will repeat the current context. **off** will turn repeat off.
     * @param deviceID The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
     * @example await player.setRepeatState('off');
     */
    setRepeatState(state: 'track' | 'context' | 'off', deviceID?: string): Promise<boolean>;
    /**
     * Toggle shuffle state for the current user's playback.
     * This method requires a spotify premium account.
     *
     * @param state The shuffle state to set.
     * @param deviceID The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
     * @example await player.setShuffleState();
     */
    setShuffleState(state?: boolean, deviceID?: string): Promise<boolean>;
    /**
     * Set volume for the current user's player.
     * This method requires a spotify premium account.
     *
     * @param volume The volume to set. Must be a value from 0 to 100 inclusive.
     * @param deviceID The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
     * @example await player.setVolume(80);
     */
    setVolume(volume: number, deviceID?: string): Promise<boolean>;
    /**
     * Add an item to the current user's queue.
     * This method requires a spotify premium account.
     *
     * @param uri The uri of the track or the episode to add to the queue.
     * @param deviceID The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
     * @example await player.addItem('uri');
     */
    addItem(uri: string, deviceID?: string): Promise<boolean>;
}
