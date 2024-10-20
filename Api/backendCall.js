const uploadImageUrlToAPI = async (imageUrl) => {
  console.log('uploadImageUrlToAPI');
  console.log('imageUrl:', imageUrl);
  if (!imageUrl || typeof imageUrl !== 'string') {
      throw new Error('No image URL provided or invalid image format. Please provide a valid image URL.');
  }

  try {

      console.log('Uploading image URL to API...');
      const response = await fetch('https://ashad001-roomaligner.hf.space/upload-room-image-url/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded', // Set content type to JSON
          },
          body: `image_url=${encodeURIComponent(imageUrl)}`
      });

      if (!response.ok) {
          const errorResponse = await response.json(); // Log the error response
          console.log('Error response:', errorResponse);
          throw new Error('Upload failed: ' + (errorResponse.detail || 'Unknown error')); // Use detail for error message
      }

      const result = await response.json();
      console.log('Image URL uploaded successfully:', result);
      
      return result; // Return the result
  } catch (error) {
      console.error('Upload failed:', error);
      throw new Error('Upload failed. Please try again.');
  }
};

export default uploadImageUrlToAPI;
