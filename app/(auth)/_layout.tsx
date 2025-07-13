import React from "react";
import { Redirect, Stack } from "expo-router";
import useAuthStore from "@/store/auth.store";

const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Redirect href={"/(tabs)/home"} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{ headerShown: false, animation: "slide_from_left" }}
      />
      <Stack.Screen
        name="sign-up"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />

      <Stack.Screen name="forgot-password" options={{headerShown: false}} />

    </Stack>
  );
};

export default AuthLayout;
