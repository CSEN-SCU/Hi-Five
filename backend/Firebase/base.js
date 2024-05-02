import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore/lite";
import {
  getCountFromServer,
  query,
  collection,
  documentId as document,
} from "firebase/firestore";
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

var valid_fields = new Map([
  ["posts", new Set(["poster_id"])],
  [
    "users",
    new Set([
      "access_token",
      "app_streak",
      "expiration_time",
      "friends",
      "playlist_id",
      "refresh_token",
      "snapshot_playlist_id",
      "username",
    ]),
  ],
  ["views", new Set(["post_id"])],
]);

//this is meant to check and see whether an document exists in a collection
async function check(_collection, document) {
  if (typeof _collection !== "string" || typeof document !== "string") {
    console.log(typeof _collection);
    console.log(typeof document);
    throw new Error("Collection name and ID must be strings");
  }

  const docRef = doc(db, _collection, document);
  const snap = await getCountFromServer(
    query(collection(docRef, _collection), where(documentId(), "==", document))
  );
  return Boolean(snap.data().count);

  const coll = collection(getDatabase(), _collection);
  const snapshot = await getCountFromServer(coll);
  console.log("count: ", snapshot.data().count);
  return snapshot.data().count > 0; // TEMP

  // const docRef = doc(db, _collection, document);
  try {
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      console.log("Document exists:", docSnapshot.data());
      return true; // Document exists
    } else {
      console.log("No such document!");
      return false; // Document does not exist
    }
  } catch (error) {
    console.error("Error checking document:", error);
    return false; // Return false in case of an error
  }

  // try {
  //   var docRef = doc(db, collection, document);

  //   const docu = await getDoc(docRef);

  //   if (docu.exists) {
  //     console.log("Document data:", docu.data());
  //     return true;
  //   } else {
  //     console.log("No such document!");
  //     return false;
  //   }
  // } catch (error) {
  //   console.log("Error getting document:", error);
  //   return false;
  // }
}

async function add(collection, document, fields) {
  if (valid_fields.has(collection)) {
    const fieldsKeys = Object.keys(fields);
    if (
      fieldsKeys.length !== valid_fields.get(collection).size ||
      !fieldsKeys.every((key) => valid_fields.get(collection).has(key))
    ) {
      throw new Error(
        "Fields object must contain exactly and only the valid fields."
      );
    }
  }
  try {
    await setDoc(doc(db, collection, document), fields);
    // console.log("Document written");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

// `field` is optional
async function get(collection, document, field) {
  if (valid_fields.has(collection)) {
    if (field && !valid_fields.get(collection).has(field)) {
      throw new Error(`Invalid field: ${field}`);
    }
  }
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
  if (valid_fields.has(collection)) {
    for (const key of Object.keys(fields)) {
      if (!valid_fields.get(collection).has(key)) {
        throw new Error(`Invalid field: ${key}`);
      }
    }
  }
  const userRef = doc(db, collection, document);
  try {
    await updateDoc(userRef, fields);
    // console.log("Document updated");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export { add, get, update, check };
