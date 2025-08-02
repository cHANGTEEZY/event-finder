import SettingsCard from "@/components/ProfileComponents/SettingsCard";
import Avatar from "../../components/Avatar";
import { useAuth, useUser } from "@clerk/clerk-expo";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { signOut } = useAuth();

  const { user } = useUser();

  const getInitials = () => {
    if (!user) return "??";

    const first = user.firstName || "";
    const last = user.lastName || "";

    if (first && last) {
      return `${first[0]}${last[0]}`.toUpperCase();
    }
    const fullName = user.fullName || "";
    const nameParts = fullName.trim().split(" ");

    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }

    if (nameParts.length === 1) {
      return nameParts[0][0].toUpperCase();
    }

    return "??";
  };

  const initials = getInitials();
  // const hasImage = !!user?.imageUrl;
  const hasImage = null;

  return (
    <View className="flex-1 bg-background">
      <View
        className="bg-accent/25 mb-10"
        style={styles.profileHeaderContainer}
      >
        <SafeAreaView>
          <Text className="text-xl text-center text-white mb-10 mt-5 font-medium">
            My Profile
          </Text>

          <View className=" justify-start items-center gap-4 mx-10">
            <Avatar
              imageUrl={hasImage ? { uri: user.imageUrl } : null}
              fallbackText={initials}
            />
            <View>
              <Text className="text-2xl text-white">
                {user?.firstName} {user?.lastName}
              </Text>
              <Text className="text-slate-200 text-center">
                {user?.emailAddresses[0].emailAddress}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </View>

      <View className="mx-6">
        <Text className="text-mutedWhite text-lg">Other pages & Settings</Text>

        <View
          className="bg-accent/20 p-5 mt-4 gap-3"
          style={{ borderRadius: 10 }}
        >
          <SettingsCard
            leftIconName="bookmark"
            leftIconColor="white"
            settingText="Wishlist"
            rightIconName="chevron-forward"
            rightIconColor="white"
            iconSize={20}
            textStyles={{ fontSize: 20, color: "white", fontWeight: "400" }}
            onPress={() => console.log("Wishlist")}
          />
          <SettingsCard
            leftIconName="bookmark"
            leftIconColor="white"
            settingText="History"
            rightIconName="chevron-forward"
            rightIconColor="white"
            iconSize={20}
            textStyles={{ fontSize: 20, color: "white" }}
            onPress={() => console.log("Wishlist")}
          />
        </View>

        <View
          className="bg-accent/20 p-5 mt-4 gap-3"
          style={{ borderRadius: 10 }}
        >
          <SettingsCard
            leftIconName="card"
            leftIconColor="white"
            settingText="Payment Method"
            rightIconName="chevron-forward"
            rightIconColor="white"
            iconSize={20}
            textStyles={{ fontSize: 20, color: "white" }}
            onPress={() => console.log("Wishlist")}
          />
          <SettingsCard
            leftIconName="notifications"
            leftIconColor="white"
            settingText="Notifications"
            rightIconName="chevron-forward"
            rightIconColor="white"
            iconSize={20}
            textStyles={{ fontSize: 20, color: "white" }}
            onPress={() => console.log("Wishlist")}
          />
          <SettingsCard
            leftIconName="shield-checkmark"
            leftIconColor="white"
            settingText="Privacy Policy"
            rightIconName="chevron-forward"
            rightIconColor="white"
            iconSize={20}
            textStyles={{ fontSize: 20, color: "white" }}
            onPress={() => console.log("Wishlist")}
          />
        </View>

        <View className="bg-red-600 p-5 mt-4" style={{ borderRadius: 10 }}>
          <SettingsCard
            leftIconName="log-out-outline"
            leftIconColor="white"
            settingText="Logout"
            rightIconName="chevron-forward"
            rightIconColor="white"
            iconSize={20}
            textStyles={{ fontSize: 20, color: "white" }}
            onPress={() => signOut()}
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileHeaderContainer: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
});
