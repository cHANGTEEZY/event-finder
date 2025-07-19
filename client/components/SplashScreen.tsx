import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { SplashScreenImage } from "@/assets/images";

const SplashScreenComponent = () => {
  return (
    <View className="flex-1">
      <ImageBackground
        source={SplashScreenImage}
        className="w-full h-full"
        resizeMode="cover"
      />
    </View>
  );
};

export default SplashScreenComponent;
