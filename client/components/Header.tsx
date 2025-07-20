import {
  View,
  Text,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

interface HeaderProps {
  leftIconName: keyof typeof Ionicons.glyphMap;
  leftIconSize: number;
  headerName: string;
  rightIconName: keyof typeof Ionicons.glyphMap;
  rightIconSize: number;
  textStyles: TextStyle;
  righIconPress: () => void;
}

const Header = ({
  leftIconName,
  leftIconSize,
  headerName,
  rightIconName,
  rightIconSize,
  textStyles,
  righIconPress,
}: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#1a2029", "#2a0d40"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradientContainer}
    >
      <View
        className="flex-row justify-between w-full  p-5 rounded-lg items-center "
        style={styles.containerStyles}
      >
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name={leftIconName} size={leftIconSize} color={"grey"} />
        </TouchableOpacity>
        <Text style={textStyles}>{headerName}</Text>
        <TouchableOpacity onPress={righIconPress}>
          <Ionicons name={rightIconName} size={rightIconSize} color={"grey"} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Header;

const styles = StyleSheet.create({
  gradientContainer: {
    borderRadius: 20,
  },

  containerStyles: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 20,
    shadowOpacity: 0.5,
    elevation: 5,
  },
});
