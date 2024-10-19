import { View, Text, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getUserData } from '../../Api/getUserData'; // Adjust the import path as needed

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserData = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const data = await getUserData();
      console.log("User data:", data);
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserData().finally(() => setRefreshing(false));
  };

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
      className="flex-1 bg-[#161622] justify-center items-center"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#ffffff" // Change the color of the spinner if desired
        />
      }
    >
      <View className="mb-4">
        <Text className="text-white">User Data:</Text>
        <Text className="text-white">{JSON.stringify(userData)}</Text>
      </View>
      <Text className="text-white">home</Text>
    </ScrollView>
  );
};

export default Home;
