import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { getUserData } from '../../Api/getUserData'; // Adjust the import path as needed
import BentoGrid from '../../components/home/BentoGrid';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have expo/vector-icons installed

const fakeData = {
  email: 'sameer@gmail.com',
  Name: 'Sameer',
  lastActive: '2 hours ago',
  recentActivities: [
    { id: 1, activity: 'Created a new floorplan', time: '1 hour ago' },
    { id: 2, activity: 'Added 2 items to favorites', time: '3 hours ago' },
    { id: 3, activity: 'Received 3 new suggestions', time: '1 day ago' },
  ]
};

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
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
      className="flex-1 bg-[#161622]"
      contentContainerStyle={{ padding: 20 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#ffffff"
        />
      }
    >
      {/* Header Section */}
      <View className="mb-8 mt-8">
        <Text className="text-white text-3xl font-bold mb-2">Dashboard</Text>
        <Text className="text-white text-xl">Hello👋 {fakeData.Name}</Text>
        <Text className="text-gray-400">Last active: {fakeData.lastActive}</Text>
      </View>


        <Text className="text-white text-lg font-semibold mb-4">Your Stats</Text>
        <BentoGrid 
          floorplans={10} 
          suggestions={5} 
          favorites={2} 
        />

      {/* Quick Actions Panel */}
      <View className="bg-[#1E1E2E] rounded-xl p-4 mb-6">
        <Text className="text-white text-lg font-semibold mb-4">Quick Actions</Text>
        <View className="flex-row justify-between">
          <TouchableOpacity className="bg-[#2A2A3A] p-3 rounded-lg items-center flex-1 mr-2">
            <Ionicons name="add-circle-outline" size={24} color="white" />
            <Text className="text-white mt-2">New Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#2A2A3A] p-3 rounded-lg items-center flex-1 mx-2">
            <Ionicons name="search-outline" size={24} color="white" />
            <Text className="text-white mt-2">Browse</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#2A2A3A] p-3 rounded-lg items-center flex-1 ml-2">
            <Ionicons name="settings-outline" size={24} color="white" />
            <Text className="text-white mt-2">Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity Section */}
      <View className="bg-[#1E1E2E] rounded-xl p-4 mb-6">
        <Text className="text-white text-lg font-semibold mb-4">Recent Activity</Text>
        {fakeData.recentActivities.map((activity) => (
          <View key={activity.id} className="flex-row items-center mb-3">
            <View className="bg-[#2A2A3A] rounded-full p-2 mr-3">
              <Ionicons name="time-outline" size={20} color="white" />
            </View>
            <View>
              <Text className="text-white">{activity.activity}</Text>
              <Text className="text-gray-400 text-sm">{activity.time}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* User Info Section */}
      <View className="bg-[#1E1E2E] rounded-xl p-4">
        <Text className="text-white text-lg font-semibold mb-4">Account Info</Text>
        <Text className="text-white">Email: {userData?.email || fakeData.email}</Text>
        {/* Add more user info fields here */}
      </View>
    </ScrollView>
  );
};

export default Home;