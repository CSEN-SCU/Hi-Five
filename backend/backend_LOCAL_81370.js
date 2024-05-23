// (This is acting as a separate instance in ../frontend/ReactNative)

console.log("backend.js")

// Instance-specific Spotify API

// import { /* TODO */ } from 'SpotifyAPI/TODO.js';

// Non-instance-specific Spotify API

import {
    // General functions:
  getGlobalID,
  getSpotifyID,
  createPlaylist,
  getPlaylist,
  addMusicToPlaylist,
  deleteTrackFromPlaylist,
  findSongAndArtists,
  recentlyPlayedTracks,
  getTrack,
  getUserName
  // Specialized functions:
} from './SpotifyAPI/SpotifyFunctions.js';

// Non-instance-specific Firebase

// TODO: specialized functions eg addFriend 

import {
  // General functions:
  checkPost,
  addPost,
  getPost,
  updatePost,
  removePost
  // Specialized functions: TODO
} from './Firebase/posts.js'

import {
  // General functions:
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
  // Specialized functions: TODO
  updateUserExpirationUsingNow
} from './Firebase/users.js'

import {
  // General functions:
  checkView,
  addView,
  getView,
  updateView,
  removeView
  // Specialized functions: TODO
} from './Firebase/views.js'

export {
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
}


