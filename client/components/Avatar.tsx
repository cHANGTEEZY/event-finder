// components/Avatar.tsx
import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";

interface AvatarProps {
  imageUrl?: ImageSourcePropType | null;
  fallbackText: string;
}

const Avatar = ({ imageUrl, fallbackText = "SG" }: AvatarProps) => {
  const showImage = imageUrl && !(typeof imageUrl === "number");

  return (
    <View
      className="rounded-md   items-center justify-center bg-accent overflow-hidden "
      style={{ height: 100, width: 100 }}
    >
      {showImage ? (
        <Image
          source={imageUrl}
          style={{ height: 100, width: 100 }}
          resizeMode="cover"
        />
      ) : (
        <View className="justify-center items-center w-full h-full">
          <Text className="text-3xl font-bold text-white">{fallbackText}</Text>
        </View>
      )}
    </View>
  );
};

export default Avatar;
