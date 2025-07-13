import { View } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";

const AuthButtons = () => {
  const handleGooglePress = () => {
    console.log("Logging in with google");
  };

  const handleGithubPress = () => {
    console.log("Logging in with github");
  };

  return (
    <View className="flex-row gap-2">
      <View className="flex-1">
        <CustomButton buttonText="Google" onPress={handleGooglePress} />
      </View>
      <View className="flex-1">
        <CustomButton buttonText="Github" onPress={handleGithubPress} />
      </View>
    </View>
  );
};

export default AuthButtons;
