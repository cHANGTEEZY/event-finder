import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import "core-js/stable/string/replace-all";

export default function Index() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/(tabs)/home"} />;
  }

  return <Redirect href={"/(auth)/sign-in"} />;
}
