// services/firebase.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDocs } from 'firebase/firestore';

console.log("Firebase service loaded");
console.log(process.env.FIREBASE_API_KEY);
// Firebase configuration (load from .env file)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

// Sign in user
const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Sign up user
const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);

const addUserData = async (userId, data) => {
  console.log("Adding user data:", userId, data);
  try {
    const docRef = doc(db, 'users', userId); // Specify the document name here
    await setDoc(docRef, data);
    return docRef.id; // This will return the userId you provided
  } catch (e) {
    throw new Error(e);
  }
};

// Get all users data
const getUsersData = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  let users = [];
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  return users;
};

export { signIn, signUp, addUserData, getUsersData, auth, db };
