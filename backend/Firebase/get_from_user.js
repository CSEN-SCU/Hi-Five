import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getFromUser(field, spotifyId) {
    const userRef = doc(db, 'user', spotifyId);
    try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const userData = userDoc.data();
            return userData[field];
        }
    } catch (error) {
        console.error(`error getting field ${field} from user ${user}: `, error);
    }
}

async function getAccessToken(spotifyId) {
    return getFromUser("access_token", spotifyId);
}

async function getRefreshToken(spotifyId) {
    return getFromUser("refresh_token", spotifyId);
}

async function getExpirationTime(spotifyId) {
    return getFromUser("expiration_time", spotifyId);
}

// async function addFriendToUser(spotifuId, friendSpotifyId) {
//     const userRef = doc(db, 'user', spotifyId);
//     try {
//         const userDoc = await getDoc(userRef);
//         if (userDoc.exists()) {
//             const userData = userDoc.data();
//             const updatedFriends = userData.friends ? [...userData.friends, friendSpotifyId] : [friendSpotifyId];
//             await updateDoc(userRef, { friends: updatedFriends });
//             return { success: true, message: "Friend added successfully." };
//         } else {
//             return { success: false, message: "User does not exist." };
//         }
//     } catch (error) {
//         console.error("Error adding friend:", error);
//         return { success: false, message: "An error occurred while adding friend." };
//     }
// }
// async function getUserFriends(spotifyID){
//   const userRef = doc(db, 'user', spotifyId);
//   try{
//     const userDoc = await getDoc(userRef);
//     if (userDoc.exists()){
//       const userData = userDoc.data();
//       const userFriends = userData.friends;
//       return {success: true, userFriends};
//     }
//   }catch (error){
//     console.error("Error getting user's friends", error);
//     return {success: false, message: "Error occurred when trying to get user's friends."}
//   }
// }





