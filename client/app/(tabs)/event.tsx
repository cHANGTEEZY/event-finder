import { EventsPageBackground } from "@/assets/images";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { SwipeListView } from "react-native-swipe-list-view";
import { BookMarkedEventsData } from "@/constants/BookMarkedEvents";
import Card from "@/components/Card";
import HapticButton from "@/components/HapticButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import Header from "@/components/Header";
import BottomDrawer from "@/components/BottomDrawer";
import EventForm from "@/components/EventComponents/EventForm";

const height = Dimensions.get("screen").height;

export default function App() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const inset = useSafeAreaInsets();
  const paddingBottom = Platform.OS === "ios" ? 100 : 120;

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const toggleDrawer = () => {
    setIsDrawerVisible((prev) => !prev);
  };

  return (
    <View className="flex-1 ">
      <ImageBackground
        className="w-full flex-1"
        source={EventsPageBackground}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <SafeAreaView className="mx-10">
          <Header
            leftIconName="arrow-back-outline"
            leftIconSize={25}
            headerName="Events"
            textStyles={{ fontSize: 20, fontWeight: 400, color: "white" }}
            rightIconName="add-circle-outline"
            rightIconSize={30}
            righIconPress={toggleDrawer}
          />

          <SwipeListView
            contentContainerStyle={{
              paddingBottom: inset.bottom + paddingBottom,
            }}
            className="mt-5 pt-5"
            data={BookMarkedEventsData}
            disableRightSwipe
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            onRowOpen={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
            onRowClose={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
            renderItem={({ item }) => {
              return (
                <View className="mb-5">
                  <Card
                    key={item.id}
                    cardStyles={{ height: 138 }}
                    id={item.id}
                    image={item.image}
                    showHeart={false}
                    showEventLocation={true}
                    artistName={item.artistName}
                    eventLocation={item.eventLocation}
                    showDate={true}
                    eventData={item.eventData}
                    showImageBlur
                  />
                </View>
              );
            }}
            renderHiddenItem={({ item }) => (
              <View className="absolute right-0 h-[138] w-1/4 bg-secondaty mr-1 rounded-[18px]  items-center justify-center">
                <HapticButton>
                  <Ionicons
                    name="close-circle-outline"
                    size={40}
                    color={"white"}
                  />
                </HapticButton>
              </View>
            )}
            rightOpenValue={-100}
          />
        </SafeAreaView>

        <BottomDrawer
          isVisible={isDrawerVisible}
          onClose={closeDrawer}
          height={height * 0.8}
        >
          <EventForm handleCloseModal={closeDrawer} />
        </BottomDrawer>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 0,
  },
});
