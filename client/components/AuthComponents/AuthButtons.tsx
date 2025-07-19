import { View } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import { Google,Github } from "@/assets/images";

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
        <CustomButton buttonText="Google" onPress={handleGooglePress} imageSource={Google} hasImage />
      </View>
      <View className="flex-1">
        <CustomButton buttonText="Github" onPress={handleGithubPress} imageSource={Github} hasImage />
      </View>
    </View>
  );
};

export default AuthButtons;
