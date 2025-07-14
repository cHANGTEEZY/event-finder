import { Button, Text, View } from "react-native";
import React from "react";
import { useAuth, useClerk } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";

const HomePage = () => {
   const {isSignedIn}=  useAuth()
   const {signOut} = useClerk()

   console.log(isSignedIn)

  return (
    <SafeAreaView>
      <Text>HomePage</Text>
      <Button title="logout" onPress={()=> signOut()}/>
    </SafeAreaView>
  );
};

export default HomePage;
