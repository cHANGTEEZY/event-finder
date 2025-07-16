import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface Props {
  headingText: string;
  navText: string;
  onPress: () => void;
}

const ComponentHeader = ({ headingText, navText, onPress }: Props) => {
  return (
    <View className="flex-row justify-between mb-6">
      <Text className="text-[16px] text-white">{headingText}</Text>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Text className="text-accent">{navText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ComponentHeader;
