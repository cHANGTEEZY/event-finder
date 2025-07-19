import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TextInputProps,
  View,
  Image,
  Pressable
} from "react-native";
import cn from "clsx";
import { Eye, Eyebrow } from "@/assets/images";
import { useState } from "react";

interface CustomInputProps extends TextInputProps {
  label?: string;
  keyboardType?: "default" | "email-address" | "numeric";
  error?: string;
  placeholder?: string;
  showEyeIcon?: boolean;
}

const CustomInput = ({
  label,
  keyboardType = "default",
  error,
  placeholder,
  showEyeIcon = false,
  ...props
}: CustomInputProps) => {
  const [eyePressed, setEyePressed] = useState(false);

  return (
    <KeyboardAvoidingView>
      <View className="mb-4">
        {label && (
          <Text
            className={cn("mb-2", error ? "text-red-500" : "text-[#4e0189]")}
          >
            {label}
          </Text>
        )}
        <View>
          <TextInput
            style={{ borderRadius: 10, padding: 12 }}
            className={cn(
              "border",
              error
                ? "border-red-500 text-red-500"
                : "border-[#c6c6c6] text-black"
            )}
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor={error ? "#ef4444" : "#1f1f1f"}
            secureTextEntry={!eyePressed ? true : false}
            {...props}
          />
          {showEyeIcon && (
            <Pressable
              onPress={() => setEyePressed((prev) => !prev)}
              className="absolute top-[30%] right-5"
            >
              <Image source={eyePressed ? Eye : Eyebrow} className="w-5 h-5" />
            </Pressable>
          )}
        </View>
        {error && <Text className="mt-1 text-red-500">{error}</Text>}
      </View>
    </KeyboardAvoidingView>
  );
};

export default CustomInput;
