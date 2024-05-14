import {
    getGlobalID,
    getSpotifyID,
    createPlaylist,
    getPlaylist,
    addMusicToPlaylist,
    deleteTrackFromPlaylist,
    findSongAndArtists,
    recentlyPlayedTracks,
    getTrack,
    getUserName,
    checkPost,
    addPost,
    getPost,
    updatePost,
    removePost,
    checkUser,
    addUser,
    getUser,
    updateUser,
    removeUser,
    getUserAccessToken,
    getUserAppStreak,
    getUserExpirationTime,
    getUserFriends,
    getUserPlaylistId,
    getUserRefreshToken,
    getUserSnapshotPlaylistId,
    getUserUsername,
    updateUserAccessToken,
    updateUserAppStreak,
    updateUserExpirationTime,
    updateUserFriends,
    updateUserPlaylistId,
    updateUserRefreshToken,
    updateUserSnapshotPlaylistId,
    updateUserUsername,
    Timestamp,
    updateUserExpirationUsingNow,
    checkView,
    addView,
    getView,
    updateView,
    removeView
} from './backend.js'

console.log(1);
let user_id = await getGlobalID();
console.log(user_id);

console.log(2);
let playlist_info = await createPlaylist(user_id);

let playlist_id = playlist_info.id;
console.log(playlist_info);

console.log(3);
playlist_info = await getPlaylist(user_id, playlist_info.id);
console.log(playlist_info);

console.log(4);

let recent = await recentlyPlayedTracks(user_id)

console.log(recent)

let song_info = await findSongAndArtists(user_id, "Hello");
console.log(song_info)
let track_id = song_info.tracks.items[0].id;

console.log(track_id)

let output = await getTrack(user_id, track_id);
let track_uri = output.uri;

console.log(track_uri);

console.log(output);

let snapshot = await addMusicToPlaylist(user_id, track_uri, playlist_id);

snapshot = await deleteTrackFromPlaylist(user_id, playlist_id, track_uri, snapshot);

console.log(snapshot);









// addMusicToPlaylist(user_id, song_id, playlist_id);
// deleteTrackFromPlaylist(user_id, song_id, snapshot);
// findSongAndArtists(user_id, searchTerm);
// recentlyPlayedTracks(user_id);
// getTrack(user_id, track_id);