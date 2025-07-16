import { PastEventsData } from "@/constants/PastEventsData";
import { View, Text, Image } from "react-native";
import ComponentHeader from "./ComponentHeader";

const PastEvents = () => {
  return (
    <View className="mt-8">
      <ComponentHeader
        headingText="Past events"
        navText="See all"
        onPress={() => console.log("Pressed")}
      />

      <View className="flex-row flex-wrap">
        {PastEventsData.map((item) => (
          <View key={item.id} className="w-1/2 p-2">
            <View className="rounded-lg flex-row">
              <Image
                source={item.image}
                style={{ width: 50, height: 50 }}
                resizeMode="contain"
              />
              <View className="p-2">
                <Text className="text-white text-[11px]">{item.date}</Text>
                <Text className="text-white text-[13px]">
                  {item.artistName}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PastEvents;
