import { Text, View } from "react-native";
import React from "react";

interface DividerProps {
  dividerText: string;
}

const Divider = ({ dividerText }: DividerProps) => {
  return (
    <View className="relative justify-center items-center my-8 w-full">
      <View className="w-full h-0.5 bg-gray-400" />
      <Text className="absolute px-4 text-gray-800 bg-slate-100">
        {dividerText}
      </Text>
    </View>
  );
};

export default Divider;
