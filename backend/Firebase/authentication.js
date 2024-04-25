import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



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





