import { View } from "react-native";
import React, { useCallback, useEffect } from "react";
import CustomButton from "@/components/CustomButton";
import { Google, Github } from "@/assets/images";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useSSO } from "@clerk/clerk-expo";
import { COLORS } from "@/lib/colors";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

const AuthButtons = () => {
  useWarmUpBrowser();

  const { startSSOFlow } = useSSO();

  const handleGooglePress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          // For web, defaults to current path
          // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
          // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

  const handleGithubPress = () => {
    console.log("Logging in with github");
  };

  return (
    <View className="flex-row gap-2">
      <View className="flex-1">
        <CustomButton
          buttonText="Google"
          onPress={handleGooglePress}
          imageSource={Google}
          hasImage
          buttonStyles={{ borderWidth: 1, borderColor: COLORS.primary }}
        />
      </View>
      <View className="flex-1">
        <CustomButton
          buttonText="Github"
          onPress={handleGithubPress}
          imageSource={Github}
          hasImage
          buttonStyles={{ borderWidth: 1, borderColor: COLORS.primary }}
        />
      </View>
    </View>
  );
};

export default AuthButtons;
