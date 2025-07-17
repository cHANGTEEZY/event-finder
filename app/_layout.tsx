import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot, SplashScreen } from "expo-router";
import Constants from "expo-constants";
import "./globals.css";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { useEffect, useCallback } from "react";

SplashScreen.preventAutoHideAsync();

function AuthGate({ children }: { children: React.ReactNode }) {
  const { isLoaded } = useAuth();

  const onReady = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  useEffect(() => {
    onReady();
  }, [isLoaded]);

  if (!isLoaded) return null;

  return <>{children}</>;
}

export default function RootLayout() {
  const publishableKey = Constants.expoConfig?.extra?.clerkPublishableKey;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <AuthGate>
          <StatusBar />
          <Slot />
          <Toast />
        </AuthGate>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
