import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  query,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  deleteField
} from "firebase/firestore/lite";
import dotenv from "dotenv";

dotenv.config({ path: '../../.env' });

// TODO: convert to React Native dotenv
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

// Putting valid_fields in base.js to have e.g. if (!valid_fields.has(collection)) throw new Error("collection invalid.");
var valid_fields = new Map([
  ["posts", new Set([])],
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
  ["views", new Set([])],
]);

async function check(collection, document) {
  // if (collection === undefined) throw new Error("Collection is undefined.");
  // if (document === undefined) throw new Error("Document is undefined.");
  const docSnap = await getDoc(doc(db, collection, document) );
  return docSnap.exists();
}

async function add(collection, document, fields) {
  // if (collection === undefined) throw new Error("Collection is undefined.");
  // if (document === undefined) throw new Error("Document is undefined.");
  // if (fields === undefined) throw new Error("Fields are undefined.");
  // if (!valid_fields.has(collection)) {
  //   throw new Error("collection invalid.");
  // }
  if (await check(collection, document)) {
    throw new Error("document already exists.");
  }
  const fieldsKeys = Object.keys(fields);
  // if (
  //   fieldsKeys.length !== valid_fields.get(collection).size ||
  //   !fieldsKeys.every((key) => valid_fields.get(collection).has(key))
  // ) {
  //   throw new Error(
  //     "Fields object must contain exactly and only the valid fields."
  //   );
  // }
  try {
    await setDoc(doc(db, collection, document), fields);
    // console.log("Document written");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

// `field` is optional
async function get(collectionName, document, field) {
  // console.log("DEBUG: ", collectionName, document, field); // DEBUG
  // if (collectionName === undefined) throw new Error("Collection is undefined.");
  // if (document === undefined) throw new Error("Document is undefined.");
  // if (field === undefined) throw new Error("Field is undefined.");
  // if (!valid_fields.has(collectionName)) {
  //   throw new Error(
  //     "collection invalid."
  //   );
  // }
  if (document && !await check(collectionName, document)) {
    throw new Error("document doesn't exists.");
  }
  // if (field && !valid_fields.get(collectionName).has(field)) {
  //   throw new Error(`Invalid field: ${field}`);
  // }
  if (document) {
    const userRef = doc(db, collectionName, document);
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
  } else {
    const collectionRef = collection(db, collectionName);
    try {
      let q = query(collectionRef)
      const querySnapshot = await getDocs(q)
      const documents = {};
      querySnapshot.docs.forEach(doc => {
        documents[doc.id] = doc.data();
      });
      return documents;
    } catch (error) {
      console.error("Error getting documents:", error);
    }
  }
}

async function update(collection, document, fields) {
  // if (collection === undefined) throw new Error("Collection is undefined.");
  // if (document === undefined) throw new Error("Document is undefined.");
  // if (fields === undefined) throw new Error("Fields are undefined.");
  // if (!valid_fields.has(collection)) {
  //   throw new Error(
  //     "collection invalid."
  //   );
  // }
  if (!await check(collection, document)) {
    throw new Error("document doesn't exists.");
  }
  // for (const key of Object.keys(fields)) {
  //   if (!valid_fields.get(collection).has(key)) {
  //     throw new Error(`Invalid field: ${key}`);
  //   }
  // }
  const userRef = doc(db, collection, document);
  try {
    await updateDoc(userRef, fields);
    // console.log("Document updated");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

async function remove(collection, document, field) {
  // if (collection === undefined) throw new Error("Collection is undefined.");
  // if (document === undefined) throw new Error("Document is undefined.");
  // if (field === undefined) throw new Error("Field is undefined.");
  // if (!valid_fields.has(collection)) {
  //   throw new Error("collection invalid.");
  // }
  if (!await check(collection, document)) {
    throw new Error("document doesn't exists.");
  }
  const docRef = doc(db, collection, document);
  try {
    if (field) {
      // If a field is provided, remove only the field
      // console.log("DEBUG: attempting to delete");
      await updateDoc(docRef, { [field]: deleteField() });
    } else {
      // If no field is provided, remove the entire document
      await deleteDoc(docRef);
    }
    // console.log("Document or field deleted");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}

export { add, get, update, check, remove };
