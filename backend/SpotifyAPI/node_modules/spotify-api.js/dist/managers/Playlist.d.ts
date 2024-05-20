import type { Client } from "../Client";
import type { PlaylistTrack, PlaylistReorderOptions } from "../Interface";
import type { CreatePlaylistQuery, Image } from "spotify-types";
import { Playlist } from "../structures/Playlist";
/**
 * A manager to perform actions which belongs to the spotify playlist web api.
 */
export declare class PlaylistManager {
    client: Client;
    /**
     * A manager to perform actions which belongs to the spotify playlist web api.
     *
     * @param client The spotify api client.
     * @example const playlists = new PlaylistManager(client);
     */
    constructor(client: Client);
    /**
     * Get a playlist's information.
     *
     * @param id The spotify playlist id.
     * @param market Only playlists that are available in that market will be returned.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example const playlist = await client.playlists.get('id');
     */
    get(id: string, market?: string, force?: boolean): Promise<Playlist | null>;
    /**
     * Get the information of the tracks in the playlist.
     *
     * @param id The spotify playlist id.
     * @param options The market, limit, offset query paramaters.
     * @example const tracks = await client.playlists.getTracks('id');
     */
    getTracks(id: string, options?: {
        market?: string;
        limit?: number;
        offset?: number;
    }): Promise<PlaylistTrack[]>;
    /**
     * Get the information of the images of the playlist.
     *
     * @param id The spotify playlist id.
     * @example const images = await client.playlists.getImages('id');
     */
    getImages(id: string): Promise<Image[]>;
    /**
     * Create a playlist for a paticular user.
     * This method requires an user authorized token.
     *
     * @param userID The spotify user id.
     * @param playlist The playlist details.
     * @example const playlist = await client.playlists.create('id', { name: 'My Playlist' });
     */
    create(userID: string, playlist: CreatePlaylistQuery): Promise<Playlist | null>;
    /**
     * Edit a playlist.
     * This method requires an user authorized token.
     *
     * @param id The playlist id.
     * @param playlist The details of the playlist to edit.
     * @example const playlist = await client.playlists.edit('id', { name: 'Edited playlist' });
     */
    edit(id: string, playlist: Partial<CreatePlaylistQuery>): Promise<boolean>;
    /**
     * Add items to the playlist.
     * This method requires an user authorized token.
     *
     * @param id The spotify playlist id.
     * @param uris The array of track or episodes uris to add.
     * @param position The index position to add those items else will append it at the end of the playlist.
     * @example
     * const snapshotID = await client.playlists.addItems('playlist id', [myTrack.uri, myAnotherTrack.uri, 'spotify:track:id']);
     */
    addItems(id: string, uris: string[], position?: number): Promise<string>;
    /**
     * Reorder items in the playlist.
     * This method requires an user authorized token.
     *
     * @param id The spotify playlist id.
     * @param options The options required to reorder items in the playlist.
     * @example
     * const snapshotID = await client.playlists.reorderItems('playlist id', {
     *     uris: ['spotify:uri:id'],
     *     insertBefore: 2
     * });
     */
    reorderItems(id: string, options: PlaylistReorderOptions): Promise<string>;
    /**
     * Remove items from the playlist.
     * This method requires an user authorized token.
     *
     * @param id The spotify playlist id.
     * @param uris The array of spotify uris of either track or episodes to remove
     * @param snapshotID The playlist’s snapshot ID against which you want to make the changes.
     * @example const snapshotID = await client.playlists.removeItems('playlist id', { uris: ['spotify:uri:id']  });
     */
    removeItems(id: string, uris: string[], snapshotID?: string): Promise<string>;
    /**
     * Upload custom images to the playlist.
     * This method requires an user authorized token.
     *
     * @param id The spotify playlist id.
     * @param imageData The imageData should contain a Base64 encoded JPEG image data, maximum payload size is 256 KB.
     * @example await client.playlists.uploadImage('id', 'data:image/jpeg;....');
     */
    uploadImage(id: string, imageData: string): Promise<boolean>;
    /**
     * Follow the playlist.
     * This method requires an user authorized token.
     *
     * @param id The spotify playlist id.
     * @param publicly If true, the playlist will be in your list publicly.
     * @example await client.playlists.follow('id');
     */
    follow(id: string, publicly?: boolean): Promise<boolean>;
    /**
     * Unfollow the playlist.
     * This method requires an user authorized token.
     *
     * @param id The spotify playlist id.
     * @example await client.playlists.unfollow('id');
     */
    unfollow(id: string): Promise<boolean>;
}
