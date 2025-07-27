import { EventsPageBackground } from "@/assets/images";
import React, { useState, version } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { SwipeListView } from "react-native-swipe-list-view";
import { BookMarkedEventsData } from "@/constants/BookMarkedEvents";
import Card from "@/components/Card";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import Header from "@/components/Header";
import BottomDrawer from "@/components/BottomDrawer";
import EventForm from "@/components/EventComponents/EventForm";
import Toast from "react-native-toast-message";
import { LayoutAnimation, UIManager } from "react-native";
import { Layout } from "react-native-reanimated";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const height = Dimensions.get("screen").height;

export default function App() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [eventData, setEventData] = useState(BookMarkedEventsData || []);

  const inset = useSafeAreaInsets();
  const paddingBottom = Platform.OS === "ios" ? 100 : 120;

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const toggleDrawer = () => {
    setIsDrawerVisible((prev) => !prev);
  };

  const handleRemoveItem = (eventId: string) => {
    setEventData((prevData) => prevData.filter((item) => item.id !== eventId));

    Toast.show({
      type: "info",
      text1: `Removed event of id ${eventId}`,
    });
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

          {eventData && eventData.length > 0 ? (
            <SwipeListView
              contentContainerStyle={{
                paddingBottom: inset.bottom + paddingBottom,
              }}
              className="mt-5 pt-5"
              data={eventData}
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
                  <Pressable onPress={() => handleRemoveItem(item.id)}>
                    <Ionicons
                      name="close-circle-outline"
                      size={40}
                      color={"white"}
                    />
                  </Pressable>
                </View>
              )}
              rightOpenValue={-100}
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-white text-3xl text-center">
                No events found
              </Text>
            </View>
          )}
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
