import { Image, View, Text, ImageSourcePropType } from "react-native";
import React from "react";

interface ProfileProps {
  imageUrl: ImageSourcePropType;
  imageFallback: string;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  email: string;
  phoneNumber?: string;
}

const ProfileHeader = ({
  imageUrl,
  userId,
  firstName,
  lastName,
  fullName,
  email,
  phoneNumber,
}: ProfileProps) => (
  <View className="w-full mx-6">
    {/* Will be avatar component 
    <Image source={imageUrl} />
    */}

    <Text></Text>
  </View>
);

export default ProfileHeader;
