import AuthButtons from "@/components/AuthComponents/AuthButtons";
import AuthHeader from "@/components/AuthComponents/AuthHeader";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Divider from "@/components/Divider";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { baseSchema } from "@/schema/auth-schema";
import * as z from "zod"
import useAuthStore from "@/store/auth.store";


type IsignInForm =  z.infer<typeof baseSchema>;

const SignInScreen = () => {
  const { handleSubmit, control,formState: {errors} } = useForm<IsignInForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(baseSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
  });
  const {setIsAuthenticated} =useAuthStore()

  const onSubmit = (data: IsignInForm) => {
    console.log("data is", data);
    setIsAuthenticated(true);
  };

  return (
    <SafeAreaView className="flex-1 mx-8">
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
                secureTextEntry={true}
              />
            )}
          />

          <TouchableOpacity className="mb-4">
            <Text className="self-end text-red-600">
              <Link href={"/(auth)/forgot-password"}>Forgot Password</Link>
            </Text>
          </TouchableOpacity>

          <CustomButton
            buttonText="Login"
            backgroundColor="#4e0189"
            textColor="white"
            textStyles={{ fontSize: 17 }}
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        <Divider dividerText="Or With" />

        <AuthButtons />
      </View>
      <View className="absolute bottom-20 left-[25%]">
        <Text>
          <Text className="text-muted">Don&apos;t have an account? </Text>
          <Link href={"/sign-up"} className="text-primary">
            Sign up
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
