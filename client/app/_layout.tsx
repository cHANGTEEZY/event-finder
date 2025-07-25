import "./globals.css";
import { useEffect, useCallback } from "react";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot, SplashScreen } from "expo-router";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

function AuthGate({ children }: { children: React.ReactNode }) {
  const { isLoaded } = useAuth();

  const onReady = useCallback(async () => {
    if (isLoaded) {
      await new Promise((res) => setTimeout(res, 2000));
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  const [fontsLoaded] = useFonts({
    DMSANS: require("../assets/fonts/DMSANSREGULAR.ttf"),
    DMSANSMEDIUM: require("../assets/fonts/DMSANSMEDIUM.ttf"),
    DMSANSSEMIBOLD: require("../assets/fonts/DMSANSSEMIBOLD.ttf"),
    DMSANSBOLD: require("../assets/fonts/DMSANSBOLD.ttf"),
    DMSANSEXTRABOLD: require("../assets/fonts/DMSANSEXTRABOLD.ttf"),
  });

  useEffect(() => {
    onReady();
  }, [onReady]);

  if (!isLoaded && !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

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
