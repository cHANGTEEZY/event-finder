import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import Constants from "expo-constants";
import "./globals.css";

export default function RootLayout() {
  const publishableKey = Constants.expoConfig?.extra?.clerkPublishableKey;

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <Slot />
    </ClerkProvider>
  );
}
