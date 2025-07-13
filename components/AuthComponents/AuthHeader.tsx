import React from "react";
import { Text, View } from "react-native";

interface AuthHeaderProps {
  header?: string;
  subHeader?: string;
}

const AuthHeader = ({ header, subHeader }: AuthHeaderProps) => {
  return (
    <View className="mt-16 mb-10">
      <Text className="text-3xl font-semibold text-[25px] ">{header}</Text>
      <Text className=" text-[#99ea1] font-semibold text-[16px]">
        {subHeader}
      </Text>
    </View>
  );
};

export default AuthHeader;
