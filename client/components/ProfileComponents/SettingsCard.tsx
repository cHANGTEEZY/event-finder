import {
  View,
  Text,
  TextStyle,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface SettingsCardProps {
  settingText: string;
  textStyles: TextStyle;
  leftIconName: keyof typeof Ionicons.glyphMap;
  rightIconName: keyof typeof Ionicons.glyphMap;
  leftIconColor: string;
  rightIconColor: string;
  iconSize: number;
  onPress?: () => void;
}

const SettingsCard = ({
  settingText,
  leftIconName,
  rightIconName,
  iconSize,
  textStyles,
  leftIconColor,
  rightIconColor,
  onPress,
}: SettingsCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View className=" flex-row justify-between items-center">
        <View className="flex-row gap-4 items-center">
          <Ionicons name={leftIconName} size={iconSize} color={leftIconColor} />
          <Text style={textStyles}>{settingText}</Text>
        </View>
        <Ionicons name={rightIconName} size={iconSize} color={rightIconColor} />
      </View>
    </TouchableOpacity>
  );
};

export default SettingsCard;
