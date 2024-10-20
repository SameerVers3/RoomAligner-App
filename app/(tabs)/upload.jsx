// Upload.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { styled } from 'nativewind';
import * as ImagePicker from 'expo-image-picker';
import uploadImage from '../../Api/uploadImage'; // Import the upload function
import getUserData from '../../Api/getUserData';
import ImageDetail from '../../components/upload/ImageDetail'; // Import the ImageDetail component

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

export default function upload({ user }) {
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState(null);

  const fetchUserData = async () => {
    try {
      const data = await getUserData();
      setUserData(data);
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    try {
      const uploadData = await uploadImage(image, userData, setImage);
      setData(uploadData); // Set the returned data to state

      Alert.alert('Upload successful', 'Your image has been uploaded!', [
        { text: 'OK' },
      ]);
    } catch (error) {
      Alert.alert('Upload failed', error.message);
    }
  };

  return (
    <StyledView className="flex-1 bg-[#161622] items-center justify-center p-5">
      <StyledText className="text-2xl font-bold text-white mb-5 mt-16">
        Upload Floor Plan
      </StyledText>
      <StyledTouchableOpacity
        className="bg-purple-600 px-5 py-3 rounded-md mb-5"
        onPress={pickImage}
      >
        <StyledText className="text-white font-bold text-base">
          Select an Image
        </StyledText>
      </StyledTouchableOpacity>
      {image && (
        <>
          <StyledImage
            source={{ uri: image }}
            className="w-52 h-52 rounded-lg mt-5"
          />
          <StyledTouchableOpacity
            className="bg-green-600 px-5 py-3 rounded-md mt-5"
            onPress={handleUpload}
          >
            <StyledText className="text-white font-bold text-base">
              Upload Image
            </StyledText>
          </StyledTouchableOpacity>
        </>
      )}
      {data && (
        <ImageDetail 
          data={data}
        />
      )}
    </StyledView>
  );
}
