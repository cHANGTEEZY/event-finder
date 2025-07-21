import AuthButtons from "@/components/AuthComponents/AuthButtons";
import AuthHeader from "@/components/AuthComponents/AuthHeader";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Divider from "@/components/Divider";
import { Link, useRouter } from "expo-router";
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseSchema } from "@/schema/auth-schema";
import * as z from "zod";
import { useSignIn } from "@clerk/clerk-expo";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

type IsignInForm = z.infer<typeof baseSchema>;

const SignInScreen = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IsignInForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(baseSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
  });
  const router = useRouter();

  const { signIn, setActive, isLoaded } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (data: IsignInForm) => {
      setIsLoading(true);

      const email = data.email;
      const password = data.password;

      if (!isLoaded) return;

      try {
        const signInAttempt = await signIn.create({
          identifier: email,
          password,
        });

        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });
          Toast.show({
            type: "success",
            text1: "Logging in",
          });
          router.replace("/");
        } else {
          console.error(
            "Sign-in not complete",
            JSON.stringify(signInAttempt, null, 2)
          );
        }
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          text2: `${err}`,
        });
        console.error("Sign-in error", JSON.stringify(err, null, 2));
      } finally {
        setIsLoading(false);
      }
    },
    [isLoaded, signIn, setActive, router]
  );

  return (
    <SafeAreaView className="flex-1 mx-8">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1 justify-between">
          <View>
            <AuthHeader
              header="Hi, Welcome Back!"
              subHeader="Hello again, you've been missed!"
            />

            <View>
              <Controller
                control={control}
                rules={{ required: true }}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    label="Email"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    keyboardType="email-address"
                    placeholder="Enter your email"
                    error={errors.email?.message}
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

              <TouchableOpacity className="mb-4">
                <Text className="self-end text-red-600">
                  <Link href={"/(auth)/forgot-password"}>Forgot Password</Link>
                </Text>
              </TouchableOpacity>

              <CustomButton
                buttonText={!isLoading ? "Login" : "Logging in...."}
                backgroundColor="#4e0189"
                textColor="white"
                textStyles={{ fontSize: 17 }}
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading}
              />
            </View>

            <Divider dividerText="Or With" />

            <AuthButtons />
          </View>

          <View className="mb-10 items-center">
            <Text>
              <Text className="text-muted">Don&apos;t have an account? </Text>
              <Link href={"/sign-up"} className="text-primary">
                Sign up
              </Link>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignInScreen;
