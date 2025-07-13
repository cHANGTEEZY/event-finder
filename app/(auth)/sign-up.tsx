import AuthButtons from "@/components/AuthComponents/AuthButtons";
import CustomButton from "@/components/CustomButton";
import Divider from "@/components/Divider";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpScreen = () => {
  return (
    <SafeAreaView className="mx-8 mt-10">
      <View>
        <Text className="text-red-400">SignUpScreen</Text>
        <CustomButton
          buttonText="Sign up"
          backgroundColor="#4e0189"
          textColor="white"
          textStyles={{ fontSize: 17 }}
        />
        <Divider dividerText="Or With" />
        <AuthButtons />
      </View>
      <View>
        <Text>
          Don&apos;t have an account? <Link href={"/sign-in"}>Sign in</Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
