import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import cn from "clsx";

interface CustomInputProps extends TextInputProps {
  label?: string;
  keyboardType?: "default" | "email-address" | "numeric";
  error?: string;
  placeholder?: string;
}

const CustomInput = ({
  label,
  keyboardType = "default",
  error,
  placeholder,
  ...props
}: CustomInputProps) => {
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
          placeholderTextColor={error ? "#ef4444" : "#1f1f1f"} // red-500 or default
          {...props}
        />
        {error && <Text className="mt-1 text-red-500">{error}</Text>}
      </View>
    </KeyboardAvoidingView>
  );
};

export default CustomInput;
