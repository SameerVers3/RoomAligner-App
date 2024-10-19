import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms/userAtom'; // Adjust the import path as needed
import AuthLayout from './(auth)/_layout';
import TabsLayout from './(tabs)/_layout';
import { auth } from '../services/firebase'; // Import your auth service
import { onAuthStateChanged } from 'firebase/auth';

const MainStack = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useRecoilValue(userState); // Get user state

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setIsLoggedIn(true);
      } else {
        // User is logged out
        setIsLoggedIn(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLoggedIn ? (
        <Stack.Screen name="(tabs)" options={{
          headerShown: false
        }}/>
      ) : (
        // If user is not logged in, show the authentication screens
        <Stack.Screen name="(tabs)" options={{
          headerShown: false
        }}/>
      )}
      {/* Other screens can be added here */}
      {/* <Stack.Screen name="/search/[query]" /> */}
    </Stack>
  );
};

export default MainStack;
