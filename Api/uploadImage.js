import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage functions
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { getUserData } from './getUserData';
import uploadImageToAPI from './backendCall';

const uploadImage = async (imageUri, user, setImage) => { // Accept user object as a parameter
  const storage = getStorage(); // Initialize Firebase storage
  const db = getFirestore(); // Initialize Firestore

  if (!imageUri) {
    throw new Error('No image selected. Please select an image before uploading.');
  }

  try {
    const userData = await getUserData(); // Fetch user data
    const response = await fetch(imageUri); // Fetch the image from the URI
    const blob = await response.blob(); // Convert image to blob
    const imageId = generateUUID(); // Generate a unique ID for the image

    // Convert the blob to a file (name it according to your needs)
    const imageFile = new File([blob], `${imageId}.jpg`, { type: blob.type });

    const imageRef = ref(storage, `images/${imageId}.jpg`); // Reference to Firebase storage

    // Upload the image to Firebase storage
    await uploadBytes(imageRef, blob);

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(imageRef);

    // Create a reference to the user's document in the imageUpload collection
    const userDocRef = doc(db, 'images', userData.id); // Document named after user.uid

    console.log('Image uploaded successfully:', downloadURL);

    console.log("Uploading image file to API");
    const apiResult = await uploadImageToAPI(downloadURL); // Call your API function with the imageFile
    console.log("API upload done");
    console.log('API result:', apiResult); // Handle the API response if needed

    const data = {
      imageUrl: downloadURL,
      createdAt: new Date().toISOString(),
      description: apiResult.natural_language_description,
      formattedDescription: apiResult.formatted_room_structure,
      formatted_room_structure: apiResult.formatted_room_structure,
    }
    
    // Save the image URL under the user document with imageId as a field
    await setDoc(userDocRef, {
      [imageId]: data,
    }, { merge: true }); // Merge to avoid overwriting existing data

    return data;

  } catch (error) {
    console.error('Upload failed: ', error);
    throw new Error('Upload failed. Please try again.');
  } finally {
    setImage(null); // Reset the image after upload attempt
  }
};

// Function to generate UUID
const generateUUID = () => {
  let d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); // Use high-precision timestamp if available
  }
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (d + Math.random() * 16) % 16 | 0; // Random value based on the timestamp
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16); // Generate the UUID
  });
  return uuid;
};

export default uploadImage;
