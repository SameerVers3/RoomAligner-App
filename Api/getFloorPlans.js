import { auth, db } from '../services/firebase'; // Adjust the import path as needed
import { collection, getDocs } from 'firebase/firestore';

// Function to get all floor plans
const getFloorPlans = async () => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("No user is signed in.");
    }

    const imagesCollectionRef = collection(db, 'images');
    const querySnapshot = await getDocs(imagesCollectionRef);

    // Create an array to hold all documents
    const floorPlans = [];
    
    querySnapshot.forEach((doc) => {
      floorPlans.push({ id: doc.id, ...doc.data() });
    });

    return floorPlans;
  } catch (e) {
    console.error("Error fetching floor plans:", e);
    throw new Error(e.message);
  }
};

export { getFloorPlans };
