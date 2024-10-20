// services/firebase.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDocs } from 'firebase/firestore';

// Load environment variables from .env file
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

// Sign in user
const signIn = async (email, password) => {
  try {
    console.log('Signing in:', email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Signed in:', userCredential.user.email);
    console.log('User:', userCredential.user.uid);
    return userCredential;
  } catch (error) {
    console.error('Error signing in:', error);
    throw new Error(error.message);
  }
};

// Sign up user
const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw new Error(error.message);
  }
};

// Add user data to Firestore
const addUserData = async (userId, data) => {
  try {
    console.log('Adding user data:', userId, data);
    const docRef = doc(db, 'users', userId); // Specify the document name here
    await setDoc(docRef, data);
    return docRef.id; // Return the userId you provided
  } catch (error) {
    console.error('Error adding user data:', error);
    throw new Error(error.message);
  }
};

// Get all users data
const getUsersData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users;
  } catch (error) {
    console.error('Error getting users data:', error);
    throw new Error(error.message);
  }
};

// Export functions
export { signIn, signUp, addUserData, getUsersData, auth, db };

console.log('Firebase service loaded');
