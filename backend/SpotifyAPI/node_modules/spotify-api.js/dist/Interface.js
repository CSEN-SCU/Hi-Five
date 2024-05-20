"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeRange = exports.Scopes = void 0;
/**
 * The scopes for the user authorization process.
 * @see https://developer.spotify.com/documentation/general/guides/scopes/
 */
var Scopes;
(function (Scopes) {
    /** Write access to user-provided images. */
    Scopes["ImageUpload"] = "ugc-image-upload";
    /** Read access to a user’s recently played tracks. */
    Scopes["ReadRecentlyPlayed"] = "user-read-recently-played";
    /** Read access to a user’s player state. */
    Scopes["ReadPlaybackState"] = "user-read-playback-state";
    /** Read access to a user's top artists and tracks. */
    Scopes["ReadTopArtistsAndUsers"] = "user-top-read";
    /** Remote control playback of Spotify. This scope is currently available to Spotify iOS and Android SDKs. */
    Scopes["RemoteControl"] = "app-remote-control";
    /** Write access to a user's public playlists. */
    Scopes["ModifyPublicPlaylists"] = "playlist-modify-public";
    /** Write access to a user’s playback state */
    Scopes["WritePlaybackState"] = "user-modify-playback-state";
    /** Write access to a user's private playlists. */
    Scopes["ModifyPrivatePlaylists"] = "playlist-modify-private";
    /** Read access to user's private playlists. */
    Scopes["ReadPrivatePlaylists"] = "playlist-read-private";
    /** Write/delete access to the list of artists and other users that the user follows. */
    Scopes["ModifyFollowers"] = "user-follow-modify";
    /** Read access to the list of artists and other users that the user follows. */
    Scopes["ReadFollowers"] = "user-follow-read";
    /** Read access to a user’s currently playing content. */
    Scopes["ReadCurrentlyPlaying"] = "user-read-currently-playing";
    /** Write/delete access to a user's "Your Music" library. */
    Scopes["ModifyUserLibrary"] = "user-library-modify";
    /** Read access to a user's library. */
    Scopes["ReadUserLibrary"] = "user-library-read";
    /** Read access to a user’s playback position in a content. */
    Scopes["ReadPlaybackPosition"] = "user-read-playback-position";
    /** Read access to user’s email address. */
    Scopes["ReadUserEmail"] = "user-read-email";
    /** Read access to user’s subscription details (type of user account). */
    Scopes["ReadUserPrivateDetails"] = "user-read-private";
    /** Include collaborative playlists when requesting a user's playlists. */
    Scopes["ReadCollaborativePlaylists"] = "playlist-read-collaborative";
    /** Control playback of a Spotify track. This scope is currently available to the Web Playback SDK. The user must have a Spotify Premium account. */
    Scopes["Streaming"] = "streaming";
})(Scopes = exports.Scopes || (exports.Scopes = {}));
/**
 * The time range type from the spotify api used for the [/me/top/{type}] endpoint.
 */
var TimeRange;
(function (TimeRange) {
    /** Time range of several years. */
    TimeRange["Long"] = "long_term";
    /** Time range of 6 months. */
    TimeRange["Medium"] = "medium_term";
    /** Time range of 4 weeks. */
    TimeRange["Short"] = "short_term";
})(TimeRange = exports.TimeRange || (exports.TimeRange = {}));
