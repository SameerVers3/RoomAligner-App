import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { styled } from 'nativewind';
import Markdown from 'react-native-markdown-display'; // Import the markdown display library

// Styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const ImageDetail = ({ data }) => {
  const [loading, setLoading] = useState(false);

  // Handle missing data
  if (!data) {
    return (
      <StyledView className="flex-1 items-center justify-center bg-[#161622] p-4 rounded-lg shadow-md">
        <StyledText className="text-red-500 text-lg">No data available</StyledText>
      </StyledView>
    );
  }

  const { imageUrl, description, formattedDescription } = data;

  // Simulated download function
  const handleDownload = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Image downloaded!'); // Placeholder for actual download logic
    }, 2000);
  };

  return (
    <StyledView className="flex-1 bg-[#161622] p-4 rounded-lg shadow-md mt-5">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <>
            {/* Image Display */}
            <View className="h-56 mb-12">
              <StyledImage
                source={{ uri: imageUrl }}
                className="h-full rounded-lg mb-4 border-2 border-white"
              />
            </View>

            {/* Description */}
            <StyledText className="text-white text-lg text-center mb-2">
              {description || 'No description available.'}
            </StyledText>

            {/* Markdown Parsed Formatted Description */}
            <Markdown style={markdownStyles}>
              {formattedDescription || 'No formatted description available.'}
            </Markdown>

            {/* Comprehensive Report (if available) */}
            {data.comprehensive_report && (
              <StyledText className="text-yellow-400 text-sm text-center mt-2">
                {JSON.stringify(data.comprehensive_report, null, 2)}
              </StyledText>
            )}

            {/* Download Button */}
            <StyledTouchableOpacity
              className="bg-green-600 px-6 py-2 rounded-md mt-4"
              onPress={handleDownload}
            >
              <StyledText className="text-white font-bold text-lg">Download Image</StyledText>
            </StyledTouchableOpacity>
          </>
        )}
      </ScrollView>
    </StyledView>
  );
};

// Custom markdown styles
const markdownStyles = {
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  heading1: {
    color: 'yellow',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  // You can customize more styles as needed
};

export default ImageDetail;
