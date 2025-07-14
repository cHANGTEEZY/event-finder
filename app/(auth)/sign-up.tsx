import AuthButtons from "@/components/AuthComponents/AuthButtons";
import AuthHeader from "@/components/AuthComponents/AuthHeader";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Divider from "@/components/Divider";
import { signUpSchema } from "@/schema/auth-schema";
import {  useSignUp } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as z from "zod";

type ISignUpForm = z.infer<typeof signUpSchema >

const SignUpScreen = () => {
  const [pendingVerification, setPendingVerification] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  const {handleSubmit,formState: {errors}, control} = useForm<ISignUpForm>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },resolver: zodResolver(signUpSchema),
    mode: "onChange",
    reValidateMode: "onSubmit"
  });

  const {isLoaded, signUp} = useSignUp()


  const onSubmit = async(data: ISignUpForm)=> {
    setIsLoading(true)
    await Promise.resolve(()=> setTimeout(()=> {
      console.log("Server loading")
    },2000))
    setIsLoading(false)

    if(!isLoaded) return
    const email = data.email
    const password = data.password

    try {
      await signUp?.create({
       emailAddress: email,
       password
      });  

      await signUp.prepareEmailAddressVerification({strategy: "email_code"})
      setPendingVerification(true)

    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
    
  }

  return (
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
          buttonText="Sign up"
          backgroundColor="#4e0189"
          textColor="white"
          textStyles={{ fontSize: 17 }}
          onPress={handleSubmit(onSubmit)}
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
    </SafeAreaView>
  );
};

export default SignUpScreen;
