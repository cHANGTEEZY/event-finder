import {
  Text,
  View,
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  TextStyle,
  ViewStyle,
} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

interface CustomButtonProps {
  buttonText?: string;
  textColor?: string;
  backgroundColor?: string;
  hasImage?: boolean;
  imageSource?: number | { uri: string };
  buttonStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  onPress?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const CustomButton = ({
  buttonText,
  textColor,
  backgroundColor,
  hasImage = false,
  imageSource,
  buttonStyles,
  onPress,
  textStyles,
  isLoading,
  disabled,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} disabled={disabled}>
      <View
        style={[
          {
            backgroundColor,
          },
          buttonStyles,
          styles.containerStyles,
        ]}
        className={`items-center justify-center gap-4 `}
      >
        {hasImage && (
          <Image
            source={imageSource || require("@/assets/images/favicon.png")}
            resizeMode="contain"
            className="w-5 h-5"
          />
        )}
        <Text style={[{ color: textColor }, textStyles]}>
          {isLoading ? "loading..." : buttonText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  containerStyles: {
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
  },
});
