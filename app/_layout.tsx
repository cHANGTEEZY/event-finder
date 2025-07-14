import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import Constants from "expo-constants";
import "./globals.css";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const publishableKey = Constants.expoConfig?.extra?.clerkPublishableKey;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <StatusBar />
        <Slot />
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
