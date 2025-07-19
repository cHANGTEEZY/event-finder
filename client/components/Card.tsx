import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ImageSourcePropType,
  ViewStyle,
  ImageStyle,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import HapticButton from "./HapticButton";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
// import { formatDateToDayMonthAbbr } from "@/lib/utils/ConvertDate";

interface EventCardProps {
  image?: ImageSourcePropType;
  artistName?: string;
  eventData?: string;
  eventLocation?: string;
  imageStyles?: ImageStyle;
  cardStyles?: ViewStyle;
  showHeart?: boolean;
  id: string;
  showEventLocation?: boolean;
  showDate?: boolean;
  showImageBlur?: boolean;
}

const Card = ({
  id,
  image,
  artistName,
  eventData,
  eventLocation,
  showEventLocation = false,
  imageStyles,
  cardStyles,
  showDate = false,
  showHeart = true,
  showImageBlur = false,
}: EventCardProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookmark = () => {
    const wasBookmarked = isPressed;

    setIsPressed(!wasBookmarked);
    setIsLoading(true);

    try {
      // throw new Error("Error Bookmarking event");
      setTimeout(() => {
        if (!wasBookmarked) {
          console.log("Simulated: Bookmarked item with id:", id);
          Toast.show({
            type: "success",
            text1: "Event bookmarked successfully",
          });
        } else {
          Toast.show({
            type: "info",
            text1: "Event Removed from bookmark",
          });
          console.log("Simulated: Removed bookmark for item with id:", id);
        }
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: `${error}`,
      });
      throw new Error("Something went wrong", error as any);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => router.push("")}>
      <View style={cardStyles}>
        <ImageBackground
          source={image}
          style={[styles.imageBackground, imageStyles]}
          imageStyle={{ borderRadius: 18 }}
          resizeMode="cover"
        >
          {showImageBlur && (
            <BlurView intensity={1} tint="light" style={styles.blurContainer} />
          )}

          {showHeart && (
            <HapticButton
              disabled={isLoading}
              onPress={handleBookmark}
              activeOpacity={0.7}
              style={styles.heartButton}
            >
              {isLoading ? (
                <ActivityIndicator size={"small"} color={"white"} />
              ) : (
                <Ionicons
                  name={isPressed ? "heart" : "heart-outline"}
                  size={20}
                  color={"white"}
                />
              )}
            </HapticButton>
          )}

          {showDate && (
            <Text className="absolute left-6 top-6 text-white">
              {/* {formatDateToDayMonthAbbr(eventData || "")} */}
              {/* {eventData} */}
            </Text>
          )}

          <View style={styles.cardContent}>
            <Text style={styles.artistName}>{artistName}</Text>
            {showEventLocation ? (
              <Text style={styles.locationText}>
                <Ionicons name="location" /> {eventLocation}
              </Text>
            ) : (
              <Text style={styles.dateText}>{eventData}</Text>
            )}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Card;

const styles = StyleSheet.create({
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
  locationText: {
    color: "white",
    fontSize: 12,
    opacity: 0.8,
  },
  heartButton: {
    position: "absolute",
    right: 28,
    top: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 8,
    borderRadius: 8,
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
