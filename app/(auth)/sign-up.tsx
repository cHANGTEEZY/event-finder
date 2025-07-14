import AuthButtons from "@/components/AuthComponents/AuthButtons";
import AuthHeader from "@/components/AuthComponents/AuthHeader";
import BottomDrawer from "@/components/BottomDrawer";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Divider from "@/components/Divider";
import { signUpSchema } from "@/schema/auth-schema";
import { useSignUp } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as z from "zod";

type ISignUpForm = z.infer<typeof signUpSchema>;

const SignUpScreen = () => {
  const [pendingVerification, setPendingVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [verificationLoading, setVerificationLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ISignUpForm>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const { isLoaded, signUp, setActive } = useSignUp();

  const onSubmit = async (data: ISignUpForm) => {
    setIsLoading(true);

    if (!isLoaded) {
      setIsLoading(false);
      return;
    }

    const email = data.email;
    const password = data.password;

    try {
      await signUp?.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded || !code.trim()) {
      Alert.alert("Error", "Please enter the verification code.");
      return;
    }

    setVerificationLoading(true);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: code.trim(),
      });

      if (signUpAttempt.status === "complete") {
        // await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/(auth)/sign-in");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
        Alert.alert("Error", "Verification failed. Please try again.");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", "Invalid verification code. Please try again.");
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded) return;

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      Alert.alert("Success", "Verification code resent to your email.");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", "Failed to resend code. Please try again.");
    }
  };

  const closeVerification = () => {
    setPendingVerification(false);
    setCode("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 mx-8">
        <View>
          <AuthHeader
            header="Create an account"
            subHeader="Connect with your friends today!"
          />

          <View>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  label="Email Address"
                  value={value}
                  placeholder="Enter your email"
                  error={errors.email?.message}
                  keyboardType="email-address"
                  secureTextEntry={false}
                />
              )}
            />
            <Controller
              control={control}
              rules={{ required: true }}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Enter your password"
                  error={errors.password?.message}
                  showEyeIcon
                />
              )}
            />

            <Controller
              control={control}
              rules={{ required: true }}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Confirm Password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Please confirm your password"
                  error={errors.confirmPassword?.message}
                  showEyeIcon
                />
              )}
            />
          </View>

          <CustomButton
            buttonText={isLoading ? "Creating Account..." : "Sign up"}
            backgroundColor="#4e0189"
            textColor="white"
            textStyles={{ fontSize: 17 }}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          />

          <Divider dividerText="Or With" />
          <AuthButtons />
        </View>

        <View className="absolute bottom-20 left-[25%]">
          <Text>
            <Text className="text-muted">Already have an account? </Text>
            <Link href={"/sign-in"} className="text-primary">
              Sign in
            </Link>
          </Text>
        </View>

        <BottomDrawer
          isVisible={pendingVerification}
          onClose={closeVerification}
          height={400}
        >
          <View style={styles.verificationContainer}>
            <Text style={styles.verificationTitle}>Verify Your Email</Text>
            <Text style={styles.verificationSubtitle}>
              We've sent a verification code to your email address. Please enter
              it below.
            </Text>

            <View style={styles.codeInputContainer}>
              <Text style={styles.codeLabel}>Verification Code</Text>
              <TextInput
                style={styles.codeInput}
                value={code}
                onChangeText={setCode}
                placeholder="Enter 6-digit code"
                keyboardType="number-pad"
                maxLength={6}
                autoFocus
              />
            </View>

            <CustomButton
              buttonText={verificationLoading ? "Verifying..." : "Verify Email"}
              backgroundColor="#4e0189"
              textColor="white"
              textStyles={{ fontSize: 16 }}
              onPress={onVerifyPress}
              disabled={verificationLoading || !code.trim()}
            />

            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>Didn't receive the code? </Text>
              <Text style={styles.resendLink} onPress={handleResendCode}>
                Resend Code
              </Text>
            </View>
          </View>
        </BottomDrawer>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  verificationContainer: {
    flex: 1,
    paddingTop: 10,
  },
  verificationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  verificationSubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
    lineHeight: 22,
  },
  codeInputContainer: {
    marginBottom: 30,
  },
  codeLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  codeInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  resendText: {
    fontSize: 14,
    color: "#666",
  },
  resendLink: {
    fontSize: 14,
    color: "#4e0189",
    fontWeight: "600",
  },
});

export default SignUpScreen;
