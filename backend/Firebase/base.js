import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore/lite";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function set(collection, document, fields) {
  try {
    await setDoc(doc(db, collection, document), fields);
    // console.log("Document written");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

// `field` is optional
async function get(collection, document, field) {
  const userRef = doc(db, collection, document);
  try {
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      // console.log("Document data:", field ? userData[field] : userData);
      return field ? userData[field] : userData;
    } else {
      // console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}

async function update(collection, document, fields) {
  const userRef = doc(db, collection, document);
  try {
    await updateDoc(userRef, fields);
    // console.log("Document updated");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export { set, get, update };
