import { getUser, getUserAccessToken, getUserPlaylistId } from '../Firebase/users.js'
import { addTrackToPlaylist, getUserProfile, createPlaylist, searchForTracks, getTrack, getRecentlyPlayedTracks } from './functions.js'

let users = await getUser();
let userId = Object.keys(users)[0];
// let fields = users[userId];
// console.log(`${userId} =>`, fields);
// console.log(await getUserProfile(userId))
console.log(await createPlaylist(userId))
let firstResultUri = (await getRecentlyPlayedTracks(userId))[0].track.uri;
let playlistId = await getUserPlaylistId(userId);
console.log("firstResultUri: ", firstResultUri)
console.log("playlistId: ", playlistId)
console.log(await addTrackToPlaylist(userId, firstResultUri, playlistId))
console.log(await addTrackToPlaylist(userId))

// let firstResult = (await searchForTracks(userId, "hello"))[0]
// console.log(firstResult);



// console.log(await addTrackToPlaylist(userId))
