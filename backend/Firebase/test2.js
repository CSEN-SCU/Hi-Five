// old

import { getUsers } from "./users.js";
import { getPosts, getPost, getPostIdCount, removeOldestPostId, checkPost, addPostId } from "./posts.js";

// console.log(await getUsers());
let spotifyId = "spotify_id";
console.log(spotifyId);
if (await checkPost(spotifyId)) {
    console.log(await getPostIdCount(spotifyId));
    console.log(await getPost(spotifyId));
    for (let i = 0; i < 30; i++) {
        console.log("adding...");
        await addPostId(spotifyId, "track_id");
        console.log(await getPostIdCount(spotifyId));
        console.log(await getPost(spotifyId));
    }
    // console.log("deleting...");
    // await removeOldestPostId(spotifyId);
    // console.log(await getPostIdCount(spotifyId));
    // console.log(await getPost(spotifyId));
}


  