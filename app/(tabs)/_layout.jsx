import { View, Text, Image, Animated } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { icons } from '../../constants';

const TabIcon = ({ icon, color, name, focused }) => {
  // Initialize animated values
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const backgroundColorAnim = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    // Animate the scale when the tab is focused/unfocused
    Animated.timing(scaleAnim, {
      toValue: focused ? 1.2 : 1,
      duration: 200,
      useNativeDriver: true
    }).start();

    // Animate the background color change
    Animated.timing(backgroundColorAnim, {
      toValue: focused ? 1 : 0,
      duration: 300,
      useNativeDriver: false // Background color cannot use native driver
    }).start();
  }, [focused]);

  // Interpolate background color for smooth transition
  const backgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#2d2254'] // from transparent to dark color
  });

  return (
    <Animated.View
      className="justify-center items-center w-20 py-1 rounded-2xl"
      style={{
        backgroundColor: backgroundColor, // Use animated background color
      }}
    >
      <Animated.Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-5 h-5"
        style={{
          transform: [{ scale: scaleAnim }], // Animate the scale
        }}
      />
      <Text
        className={`${focused ? 'font-psemibold' : 'pregular'} text-xs`}
        style={{
          color: color
        }}
      >
        {name}
      </Text>
    </Animated.View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#983BCB",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 64,
          //rounded corners
          // borderTopRadius: 20,
        },
        tabBarItemStyle: ({ focused }) => ({
          backgroundColor: focused ? '#4023D7' : 'transparent',
        }),
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          )
        }}
      />

      <Tabs.Screen
        name="upload"
        options={{
          title: "Upload",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.cloud}
              color={color}
              name="Upload"
              focused={focused}
            />
          )
        }}
      />

      <Tabs.Screen
        name="floorPlan"
        options={{
          title: "Floor Plan",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.floorPlan}
              color={color}
              name="Floor Plan"
              focused={focused}
            />
          )
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.chat}
              color={color}
              name="Chat"
              focused={focused}
            />
          )
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
