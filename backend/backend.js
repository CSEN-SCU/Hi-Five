console.log("backend.js")

// Spotify API

import {
    // General functions:
    getUserProfile,
    getSpotifyUserId,
    getUserDisplayName,
    createPlaylist,
    getPlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
    searchForTracks,
    getRecentlyPlayedTracks,
    getTrack
} from './SpotifyAPI/functions.js';

// Firebase

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
  getUsers,
  getUser,
  updateUser,
  removeUser,
  getUserAccessToken,
  getUserAppStreak,
  getUserExpirationTime,
  getUserFollowing,
  getUserPlaylistId,
  getUserRefreshToken,
  getUserSnapshotPlaylistId,
  getUserUsername,
  updateUserAccessToken,
  updateUserAppStreak,
  updateUserExpirationTime,
  updateUserFollowing,
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
  getUserProfile,
  getSpotifyUserId,
  getUserDisplayName,
  createPlaylist,
  getPlaylist,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  searchForTracks,
  getRecentlyPlayedTracks,
  getTrack,

  checkPost,
  addPost,
  getPost,
  updatePost,
  removePost,

  checkUser,
  addUser,
  getUsers,
  getUser,
  updateUser,
  removeUser,
  getUserAccessToken,
  getUserAppStreak,
  getUserExpirationTime,
  getUserFollowing,
  getUserPlaylistId,
  getUserRefreshToken,
  getUserSnapshotPlaylistId,
  getUserUsername,
  updateUserAccessToken,
  updateUserAppStreak,
  updateUserExpirationTime,
  updateUserFollowing,
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
  removeView,
}

