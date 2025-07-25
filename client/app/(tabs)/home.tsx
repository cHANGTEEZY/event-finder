import React from "react";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BackgroundImage } from "@/assets/images";
import CustomButton from "@/components/CustomButton";
import { COLORS } from "@/lib/colors";
import Carousel from "react-native-reanimated-carousel";
import { CarouselData } from "@/constants/CarouselData";
import PastEvents from "@/components/HomeComponents/PastEvents";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ComponentHeader from "@/components/HomeComponents/ComponentHeader";
import Card from "@/components/Card";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const HomePage = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className={`bg-background flex-1`}
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
      <View className="relative mb-6">
        <ImageBackground
          source={BackgroundImage}
          resizeMode="cover"
          style={styles.coverImage}
        />
        <View className="flex items-center absolute -bottom-5 left-[50%] translate-x-[-50%] mb-4">
          <Text className="text-[16px] color-[#f9fafc]">Upcoming event</Text>
          <Text className="text-[28px] color-[#f9fafc] font-DMSANSBOLD  text-center ">
            Above & Beyond {"\n"} #ABGT500
          </Text>
        </View>
      </View>

      <View className="flex-row gap-4 mx-8">
        <View className="flex-1">
          <CustomButton
            buttonText="See dates"
            backgroundColor={COLORS.primary}
            textColor="white"
            textStyles={{ fontSize: 16 }}
            buttonStyles={{ height: 43 }}
          />
        </View>
        <View className="flex-1">
          <CustomButton
            buttonText="Tickets"
            backgroundColor={COLORS.secondary}
            textColor="white"
            textStyles={{ fontSize: 16 }}
            buttonStyles={{ height: 43 }}
          />
        </View>
      </View>

      <View className="m-8">
        <ComponentHeader
          headingText="Events in your city"
          navText="See all"
          onPress={() => console.log("Pressed")}
        />

        <Carousel
          width={width}
          height={height * 0.25}
          data={CarouselData}
          scrollAnimationDuration={600}
          renderItem={({ item }) => (
            <View className="mr-16">
              <Card
                key={item.id}
                id={item.id}
                image={item.image}
                artistName={item.artistName}
                eventData={item.eventData}
              />
            </View>
          )}
        />

        <PastEvents />
      </View>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  coverImage: {
    height: height * 0.35,
    width: "100%",
  },
});
