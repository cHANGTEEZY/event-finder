import React from "react";
import { Redirect, Slot } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const ComponentName = () => {
  const {isSignedIn} = useAuth()

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  return <Slot />;
};

export default ComponentName;
