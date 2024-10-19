// services/userService.js
import { auth, db } from '../services/firebase'; // Adjust the import path as needed
import { doc, getDoc } from 'firebase/firestore';

// Function to get user data by their uid
const getUserData = async () => {
  try {
    const currentUser = auth.currentUser;

    console.log("Current user:", currentUser);
    console.log("Current user uid:", currentUser.uid);
    
    if (!currentUser) {
      throw new Error("No user is signed in.");
    }

    const userDocRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error("User data not found.");
    }

    return { id: userDoc.id, ...userDoc.data() };
  } catch (e) {
    console.error("Error fetching user data:", e);
    throw new Error(e.message);
  }
};

export { getUserData };
