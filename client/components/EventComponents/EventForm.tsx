import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "@/schema/event-schema";
import CustomInput from "../CustomInput";
import z from "zod";
import CustomButton from "../CustomButton";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";

type IeventForm = z.infer<typeof eventSchema>;

const EventForm = ({ handleCloseModal }: { handleCloseModal: () => void }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IeventForm>({
    defaultValues: {
      eventName: "",
      eventDate: new Date(),
      eventTime: "",
      duration: "",
      location: "",
    },
    resolver: zodResolver(eventSchema),
  });

  const watchedDate = watch("eventDate");
  const watchedTime = watch("eventTime");

  const onSubmit = (data: IeventForm) => {
    console.log(data);
    handleCloseModal();
  };

  const formatDate = (date: Date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    // On Android, close picker immediately after selection
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      setValue("eventDate", selectedDate);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    if (Platform.OS === "android") {
      setShowTimePicker(false);
    }

    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, "0");
      const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
      setValue("eventTime", `${hours}:${minutes}`);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={{ flex: 1 }}>
        <Text className="text-4xl mt-5 font-bold">Create Event</Text>

        <ScrollView
          className="mt-8 flex-1"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1">
            <Controller
              control={control}
              name="eventName"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  label="Event name"
                  error={errors.eventName?.message}
                  placeholder="Enter event name"
                  secureTextEntry={false}
                />
              )}
            />

            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Event Date
              </Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className="border border-gray-300 rounded-lg p-3 bg-white min-h-[50px] justify-center"
              >
                <Text className="text-base text-gray-800">
                  {formatDate(watchedDate)}
                </Text>
              </TouchableOpacity>
              {errors.eventDate && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.eventDate.message}
                </Text>
              )}
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Event Time
              </Text>
              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                className="border border-gray-300 rounded-lg p-3 bg-white min-h-[50px] justify-center"
              >
                <Text className="text-base text-gray-800">
                  {watchedTime || "Select time"}
                </Text>
              </TouchableOpacity>
              {errors.eventTime && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.eventTime.message}
                </Text>
              )}
            </View>

            <Controller
              control={control}
              name="duration"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  label="Duration"
                  error={errors.duration?.message}
                  placeholder="HH:mm (e.g., 02:30)"
                  secureTextEntry={false}
                />
              )}
            />

            <Controller
              control={control}
              name="location"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.location?.message}
                  label="Event location"
                  placeholder="Enter event location"
                  secureTextEntry={false}
                />
              )}
            />

            <View className="gap-2 mt-10">
              <CustomButton
                buttonText="Cancel"
                backgroundColor="#2f3a4b"
                textColor="white"
                onPress={handleCloseModal}
              />
              <CustomButton
                buttonText="Create Event"
                backgroundColor="#4e0189"
                textColor="white"
                onPress={handleSubmit(onSubmit)}
              />
            </View>
            <View className="flex-row gap-2 pb-4 pt-4 mb-10"></View>
          </View>
        </ScrollView>

        {showDatePicker && (
          <DateTimePicker
            value={watchedDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onTimeChange}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default EventForm;
