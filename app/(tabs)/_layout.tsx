import Home from "@/assets/animations/Home.json";
import Events from "../../assets/animations/Confetti.json";
import Profile from "../../assets/animations/Profile.json";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { Text, View } from "react-native";
import type { AnimationObject } from "lottie-react-native";

interface TabBarProps {
  text?: string;
  focused?: boolean;
  icon?: string | AnimationObject | { uri: string };
}

const TabBarIcon = ({ text, focused, icon }: TabBarProps) => {
  return (
    <View>
      <LottieView
        source={icon}
        style={{ width: 50, height: 50 }}
        autoPlay={focused}
        loop={focused}
      />
      <Text>{text}</Text>
    </View>
  );
};

const HomeLayout = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          elevation: 6,
          shadowColor: "#1a1a1a",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
          marginHorizontal: 10,
          height: 80,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => {
            return <TabBarIcon text="" icon={Home} focused={focused} />;
          },
        }}
      />
      <Tabs.Screen
        name="event"
        options={{
          title: "Events",
          tabBarIcon: ({ focused }) => {
            return <TabBarIcon text="Events" icon={Events} focused={focused} />;
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => {
            return <TabBarIcon icon={Profile} focused={focused} />;
          },
        }}
      />
    </Tabs>
  );
};

export default HomeLayout;
