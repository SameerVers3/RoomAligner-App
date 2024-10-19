import { View } from 'react-native';
import React from 'react';
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false, // Hide header for all screens in this stack
        }}
      >
        <Stack.Screen
          name="sign-in"
        />
        <Stack.Screen
          name="sign-up"
        />
      </Stack>
      <StatusBar backgroundColor="#161622" />
    </>
  );
}

export default AuthLayout;
