import { View, Text, ActivityIndicator, ScrollView, RefreshControl, Image, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getFloorPlans } from '../../Api/getFloorPlans'; // Adjust the import path as needed
import { Feather } from '@expo/vector-icons'; // For icons

// Fake floor plan data for display if real data is unavailable
const fakeFloorPlans = [
  {
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/roomaligner.appspot.com/o/images%2Fa1dc916b-5275-4ebd-ba59-d91d17f5992a.jpg?alt=media&token=5bf01691-ccb5-49e8-bbba-73c5ca275203',
    name: 'Luxury Apartment Plan',
    description: '3 Bed, 2 Bath - 1500 sqft',
  },
  {
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/roomaligner.appspot.com/o/images%2Fa1dc916b-5275-4ebd-ba59-d91d17f5992a.jpg?alt=media&token=5bf01691-ccb5-49e8-bbba-73c5ca275203',
    name: 'Modern Studio Plan',
    description: '1 Bed, 1 Bath - 600 sqft',
  },
  {
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/roomaligner.appspot.com/o/images%2Fa1dc916b-5275-4ebd-ba59-d91d17f5992a.jpg?alt=media&token=5bf01691-ccb5-49e8-bbba-73c5ca275203',
    name: 'Family House Plan',
    description: '4 Bed, 3 Bath - 2400 sqft',
  },
];

// Component for displaying individual floor plan card
const FloorPlanCard = ({ imageUrl, name, description }) => {
  return (
    <View className="flex-row items-center p-4 border border-gray-400 rounded-lg mb-4 bg-gray-900">
      <Image source={{ uri: imageUrl }} className="w-24 h-24 rounded-lg mr-4" />
      <View className="flex-1">
        <Text className="text-white font-bold text-lg">{name}</Text>
        <Text className="text-gray-400">{description}</Text>
      </View>
    </View>
  );
};

// List to display all floor plans
const FloorPlanList = ({ floorPlans }) => {
  return (
    <View className="mt-4 w-full p-2">
      {floorPlans.map((plan, index) => (
        <FloorPlanCard
          key={index}
          imageUrl={plan.imageUrl}
          name={plan.name}
          description={plan.description}
        />
      ))}
    </View>
  );
};

// Header component for the main screen
const Header = () => {
  return (
    <View className="w-full p-4 bg-gray-800">
      <Text className="text-white text-2xl font-bold">Floor Plans</Text>
    </View>
  );
};

// Search bar component
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <View className="w-full p-4 bg-gray-800 flex-row items-center">
      <Feather name="search" size={20} color="white" />
      <TextInput
        className="flex-1 ml-2 p-2 bg-gray-700 text-white rounded-lg"
        placeholder="Search floor plans..."
        placeholderTextColor="#ccc"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
    </View>
  );
};

// Floor plan summary for showing stats or additional info
const FloorPlanSummary = ({ totalPlans }) => {
  return (
    <View className="w-full p-4 bg-gray-800">
      <Text className="text-gray-400">Total Floor Plans: <Text className="text-white">{totalPlans}</Text></Text>
    </View>
  );
};

// Main home component
const Home = () => {
  const [floorPlans, setFloorPlans] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchFloorPlans = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const data = await getFloorPlans();
      if (!data || data.length === 0) {
        setFloorPlans(fakeFloorPlans); // Use fake data if no real data is available
      } else {
        setFloorPlans(data);
      }
    } catch (err) {
      setFloorPlans(fakeFloorPlans); // Fallback to fake data in case of error
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFloorPlans();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFloorPlans().finally(() => setRefreshing(false));
  };

  // Filter the floor plans based on search term
  const filteredFloorPlans = fakeFloorPlans

  if (loading) {
    return (
      <View className="flex-1 bg-[#161622] justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-[#161622] justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-[#161622]"
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#ffffff" // Change the color of the spinner if desired
        />
      }
    >
      {/* Header */}
      <Header className="mt-16" />

      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Summary */}
      <FloorPlanSummary totalPlans={floorPlans.length} />

      {/* List of Floor Plans */}
      <View className="mt-4 border w-full p-5">
        {filteredFloorPlans.length > 0 ? (
          <FloorPlanList floorPlans={filteredFloorPlans} />
        ) : (
          <Text className="text-white">No plans found</Text>
        )}
      </View>

      {/* Footer */}
      <Text className="text-white mt-10">End of floor plans</Text>
    </ScrollView>
  );
};

export default Home;
