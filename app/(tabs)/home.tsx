import React from "react";
import {
  Dimensions,
  ImageBackground,
  Pressable,
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

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const HomePage = () => {
  return (
    <View className={`bg-background flex-1`}>
      <View className="relative mb-6">
        <ImageBackground
          source={BackgroundImage}
          resizeMode="cover"
          style={styles.coverImage}
        />
        <View className="flex items-center absolute -bottom-5 left-[50%] translate-x-[-50%] mb-4">
          <Text className="text-[16px] color-[#f9fafc]">Upcoming event</Text>
          <Text className="text-[28px] color-[#f9fafc] text-center font-bold">
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
        <View className="flex-row justify-between mb-6">
          <Text className="text-[16px] text-white">Events in your city</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="text-accent">See all</Text>
          </TouchableOpacity>
        </View>

        <Carousel
          // loop={false}
          width={width}
          height={height}
          data={CarouselData}
          scrollAnimationDuration={600}
          renderItem={({ item }) => (
            <View style={styles.carouselCard}>
              <ImageBackground
                source={item.image}
                style={styles.imageBackground}
                imageStyle={{ borderRadius: 18 }}
                resizeMode="cover"
              >
                <View style={styles.cardContent}>
                  <Text style={styles.artistName}>{item.artistName}</Text>
                  <Text style={styles.dateText}>{item.eventData}</Text>
                </View>
              </ImageBackground>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  coverImage: {
    height: height * 0.35,
    width: "100%",
  },
  carouselCard: {
    height: height * 0.22,
    width: width - 50,
    borderRadius: 18,
    marginRight: 12,
  },
  imageBackground: {
    height: "100%",
    width: "100%",
    borderRadius: 18,
    overflow: "hidden",
  },
  cardContent: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  artistName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  dateText: {
    color: "white",
    fontSize: 12,
    opacity: 0.8,
  },
});
