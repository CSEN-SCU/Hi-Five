import type { Client } from "../Client";
import type { User } from "../structures/User";
import type { Playlist } from "../structures/Playlist";
/**
 * A manager to perform actions which belongs to the spotify user web api.
 */
export declare class UserManager {
    client: Client;
    /**
     * A manager to perform actions which belongs to the spotify user web api.
     *
     * @param client The spotify api client.
     * @example const users = new UserManager(client);
     */
    constructor(client: Client);
    /**
     * Get an user's information.
     *
     * @param id The spotify user id.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example const user = await client.users.get('id');
     */
    get(id: string, force?: boolean): Promise<User | null>;
    /**
     * Get the list of playlists of a user by the user's spotify id.
     *
     * @param id The spotify user id.
     * @param options The limit, offset query parameter options.
     * @example const playlists = await client.users.getPlaylists('id');
     */
    getPlaylists(id: string, options?: {
        limit?: number;
        offset?: number;
    }): Promise<Playlist[]>;
    /**
     * Verify a list of users follows a paticular playlist.
     *
     * @param playlistID The id of the spotify playlist.
     * @param ids The array of spotify user ids.
     * @example const [userFollows] = await client.users.followsPlaylist('id');
     */
    followsPlaylist(playlistID: string, ...ids: string[]): Promise<boolean[]>;
    /**
     * Follow one or many users.
     * This method requires an user authorized token.
     *
     * @param ids The array of user ids.
     * @example await client.users.follow('id1', 'id2');
     */
    follow(...ids: string[]): Promise<boolean>;
    /**
     * Unfollow one or many users.
     * This method requires an user authorized token.
     *
     * @param ids The array of user ids.
     * @example await client.users.unfollow('id1', 'id2');
     */
    unfollow(...ids: string[]): Promise<boolean>;
}
