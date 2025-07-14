import React from "react";
import { useClerk } from "@clerk/clerk-expo";
import { Text, View } from "react-native";

const HomePage = () => {
  const { signOut } = useClerk();

  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

export default HomePage;
