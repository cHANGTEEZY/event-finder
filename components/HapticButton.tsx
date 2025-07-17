import { TouchableOpacity } from "react-native";
import * as Haptic from "expo-haptics";

const HapticButton = ({ children, onPress, disabled, ...rest }: any) => {
  const handlePress = () => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <TouchableOpacity
      {...rest}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  );
};

export default HapticButton;
