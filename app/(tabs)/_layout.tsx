import Home from "@/assets/animations/Home.json";
import Events from "../../assets/animations/Confetti.json";
import Profile from "../../assets/animations/Profile.json";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { Platform, Text, View } from "react-native";
import type { AnimationObject } from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";

interface TabBarProps {
  text?: string;
  focused?: boolean;
  icon?: string | AnimationObject | { uri: string };
  positioning?: number;
  size?: number;
}

const TabBarIcon = ({
  text,
  focused,
  icon,
  positioning,
  size = 60,
}: TabBarProps) => {
  return (
    <View className={``}>
      <LottieView
        source={icon}
        style={{
          width: size,
          height: size,
          position: "relative",
          top: positioning,
        }}
        autoPlay={focused}
        loop={focused}
      />
      {/* <Text>{text}</Text> */}
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
          bottom: 25,
          elevation: 10,
          shadowColor: "#1a1a1a",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 2,
          shadowRadius: 8,
          marginHorizontal: 20,
          height: 80,
          borderColor: "transparent",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          overflow: Platform.OS === "ios" ? "" : "hidden",
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={["#1a2029", "#2a0d40"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{
              flex: 1,
              borderRadius: 50,
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarIcon
                icon={Home}
                focused={focused}
                positioning={20}
                size={85}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="event"
        options={{
          title: "Events",
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarIcon
                icon={Events}
                focused={focused}
                positioning={12}
                size={80}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarIcon icon={Profile} focused={focused} positioning={22} />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default HomeLayout;
